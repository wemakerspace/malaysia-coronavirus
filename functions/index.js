const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const Papa = require("papaparse");
const {CanvasRenderService} = require("chartjs-node-canvas");
const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");

admin.initializeApp({
  storageBucket: functions.config().config.storagebucket,
  databaseURL: functions.config().config.databaseurl,
});

const db = admin.database();
const storage = admin.storage();

Papa.parsePromise = async (content) => {
  const buff = Buffer.from(content, "base64");
  const text = buff.toString("ascii");
  return new Promise(function(complete, error) {
    Papa.parse(text, {
      transformHeader: (header) => header.trim(),
      skipEmptyLines: true,
      header: true,
      complete,
      error,
    });
  });
};

const getRepoContent = async (repo, file) => {
  const baseUrl = `https://api.github.com/repos/${repo}/contents`;
  const req = await fetch(`${baseUrl}/${file}`, {
    headers: {
      "Authorization": `token ${functions.config().config.githubtoken}`,
      "Content-Type": "application/json",
    },
  });
  return await req.json();
};

const getMalaysiaTestsData = async () => {
  const repo = "MoH-Malaysia/covid19-public";
  const file = "epidemic/tests_malaysia.csv";
  const content = await getRepoContent(repo, file);
  const commitRef = db.ref("commit/testing/malaysia");
  const snapshot = await commitRef.once("value");
  if (content.sha === snapshot.val()) return false;
  const data = (await Papa.parsePromise(content.content)).data;
  const result = {};
  data.forEach((e) => {
    result[e.date] = {
      "rtk-ag": parseInt(e["rtk-ag"]),
      "pcr": parseInt(e["pcr"]),
    };
  });
  const ref = db.ref("data/testing/malaysia");
  await ref.set(result);
  await getTestingSummary();
  await commitRef.set(content.sha);
  return true;
};

const getMalaysiaCasesData = async () => {
  const repo = "MoH-Malaysia/covid19-public";
  const file = "epidemic/cases_malaysia.csv";
  const content = await getRepoContent(repo, file);
  const commitRef = db.ref("commit/cases/malaysia");
  const snapshot = await commitRef.once("value");
  if (content.sha === snapshot.val()) return false;
  const data = (await Papa.parsePromise(content.content)).data;
  const result = {};
  data.forEach((e) => {
    result[e.date] = {
      cases_new: parseInt(e["cases_new"]),
    };
  });
  const ref = db.ref("data/cases/malaysia");
  await ref.set(result);
  await getCasesSummary();
  await commitRef.set(content.sha);
  return true;
};

const getStatesCasesData = async () => {
  const repo = "MoH-Malaysia/covid19-public";
  const file = "epidemic/cases_state.csv";
  const content = await getRepoContent(repo, file);
  const commitRef = db.ref("commit/cases/states");
  const snapshot = await commitRef.once("value");
  if (content.sha === snapshot.val()) return false;
  const data = (await Papa.parsePromise(content.content)).data;
  const result = {};
  data.forEach((e) => {
    const state = e.state.replace(/\s/g, "_").replace(/\./g, "").toLowerCase();
    if (!result[state]) {
      result[state] = {};
    }
    result[state][e.date] = {
      cases_new: parseInt(e["cases_new"]),
    };
  });
  const ref = db.ref("data/cases/states");
  await ref.set(result);
  await commitRef.set(content.sha);
  return true;
};

const getMalaysiaDeathsData = async () => {
  const repo = "MoH-Malaysia/covid19-public";
  const file = "epidemic/deaths_malaysia.csv";
  const content = await getRepoContent(repo, file);
  const commitRef = db.ref("commit/deaths/malaysia");
  const snapshot = await commitRef.once("value");
  if (content.sha === snapshot.val()) return false;
  const data = (await Papa.parsePromise(content.content)).data;
  const result = {};
  data.forEach((e) => {
    result[e.date] = {
      deaths_new: parseInt(e["deaths_new"]),
    };
  });
  const ref = db.ref("data/deaths/malaysia");
  await ref.set(result);
  await getDeathsSummary();
  await commitRef.set(content.sha);
  return true;
};

const getStatesDeathsData = async () => {
  const repo = "MoH-Malaysia/covid19-public";
  const file = "epidemic/deaths_state.csv";
  const content = await getRepoContent(repo, file);
  const commitRef = db.ref("commit/deaths/states");
  const snapshot = await commitRef.once("value");
  if (content.sha === snapshot.val()) return false;
  const data = (await Papa.parsePromise(content.content)).data;
  const result = {};
  data.forEach((e) => {
    const state = e.state.replace(/\s/g, "_").replace(/\./g, "").toLowerCase();
    if (!result[state]) {
      result[state] = {};
    }
    result[state][e.date] = {
      deaths_new: parseInt(e["deaths_new"]),
    };
  });
  const ref = db.ref("data/deaths/states");
  await ref.set(result);
  await commitRef.set(content.sha);
  return true;
};

const getVaccinationsData = async () => {
  const repo = "CITF-Malaysia/citf-public";
  const file = "vaccination/vax_state.csv";
  const content = await getRepoContent(repo, file);
  const commitRef = db.ref("commit/vaccinations/states");
  const snapshot = await commitRef.once("value");
  if (content.sha === snapshot.val()) return false;
  const data = (await Papa.parsePromise(content.content)).data;
  const result = {
    malaysia: {},
    states: {},
  };
  data.forEach((e) => {
    const state = e.state.replace(/\s/g, "_").replace(/\./g, "").toLowerCase();
    if (!result.malaysia[e.date]) {
      result.malaysia[e.date] = {
        dose1_daily: 0,
        dose2_daily: 0,
        dose1_cumul: 0,
        dose2_cumul: 0,
      };
    }
    if (!result.states[state]) {
      result.states[state] = {};
    }
    const mys = result.malaysia[e.date];
    result.states[state][e.date] = {
      dose1_daily: parseInt(e["dose1_daily"]),
      dose2_daily: parseInt(e["dose2_daily"]),
      dose1_cumul: parseInt(e["dose1_cumul"]),
      dose2_cumul: parseInt(e["dose2_cumul"]),
    };
    result.malaysia[e.date] = {
      dose1_daily: mys.dose1_daily + parseInt(e["dose1_daily"]),
      dose2_daily: mys.dose2_daily + parseInt(e["dose2_daily"]),
      dose1_cumul: mys.dose1_cumul + parseInt(e["dose1_cumul"]),
      dose2_cumul: mys.dose2_cumul + parseInt(e["dose2_cumul"]),
    };
  });
  const ref = db.ref("data/vaccinations");
  await ref.set(result);
  await getVaccinationsSummary();
  await commitRef.set(content.sha);
  return true;
};

const getHospitalData = async () => {
  const repo = "MoH-Malaysia/covid19-public";
  const file = "epidemic/hospital.csv";
  const content = await getRepoContent(repo, file);
  const commitRef = db.ref("commit/healthcare/hospital");
  const snapshot = await commitRef.once("value");
  if (content.sha === snapshot.val()) return false;
  const data = (await Papa.parsePromise(content.content)).data;
  const result = {
    malaysia: {},
    states: {},
  };
  data.forEach((e) => {
    const state = e.state.replace(/\s/g, "_").replace(/\./g, "").toLowerCase();
    if (!result.malaysia[e.date]) {
      result.malaysia[e.date] = {
        beds: 0,
        beds_noncrit: 0,
        admitted_pui: 0,
        admitted_covid: 0,
        admitted_total: 0,
        discharged_pui: 0,
        discharged_covid: 0,
        discharged_total: 0,
        hosp_covid: 0,
        hosp_pui: 0,
        hosp_noncovid: 0,
      };
    }
    if (!result.states[state]) {
      result.states[state] = {};
    }
    const mys = result.malaysia[e.date];
    result.states[state][e.date] = {
      beds: parseInt(e["beds"]),
      beds_noncrit: parseInt(e["beds_noncrit"]),
      admitted_pui: parseInt(e["admitted_pui"]),
      admitted_covid: parseInt(e["admitted_covid"]),
      admitted_total: parseInt(e["admitted_total"]),
      discharged_pui: parseInt(e["discharged_pui"]),
      discharged_covid: parseInt(e["discharged_covid"]),
      discharged_total: parseInt(e["discharged_total"]),
      hosp_covid: parseInt(e["hosp_covid"]),
      hosp_pui: parseInt(e["hosp_pui"]),
      hosp_noncovid: parseInt(e["hosp_noncovid"]),
    };
    result.malaysia[e.date] = {
      beds: mys.beds + parseInt(e["beds"]),
      beds_noncrit: mys.beds_noncrit + parseInt(e["beds_noncrit"]),
      admitted_pui: mys.admitted_pui + parseInt(e["admitted_pui"]),
      admitted_covid: mys.admitted_covid + parseInt(e["admitted_covid"]),
      admitted_total: mys.admitted_total + parseInt(e["admitted_total"]),
      discharged_pui: mys.discharged_pui + parseInt(e["discharged_pui"]),
      discharged_covid: mys.discharged_covid + parseInt(e["discharged_covid"]),
      discharged_total: mys.discharged_total + parseInt(e["discharged_total"]),
      hosp_covid: mys.hosp_covid + parseInt(e["hosp_covid"]),
      hosp_pui: mys.hosp_pui + parseInt(e["hosp_pui"]),
      hosp_noncovid: mys.hosp_noncovid + parseInt(e["hosp_noncovid"]),
    };
  });
  const ref = db.ref("data/healthcare/hospital");
  await ref.set(result);
  await getHospitalSummary();
  await commitRef.set(content.sha);
  return true;
};

const getICUData = async () => {
  const repo = "MoH-Malaysia/covid19-public";
  const file = "epidemic/icu.csv";
  const content = await getRepoContent(repo, file);
  const commitRef = db.ref("commit/healthcare/icu");
  const snapshot = await commitRef.once("value");
  if (content.sha === snapshot.val()) return false;
  const data = (await Papa.parsePromise(content.content)).data;
  const result = {
    malaysia: {},
    states: {},
  };
  data.forEach((e) => {
    const state = e.state.replace(/\s/g, "_").replace(/\./g, "").toLowerCase();
    if (!result.malaysia[e.date]) {
      result.malaysia[e.date] = {
        bed_icu: 0,
        bed_icu_rep: 0,
        bed_icu_total: 0,
        bed_icu_covid: 0,
        vent: 0,
        vent_port: 0,
        icu_covid: 0,
        icu_pui: 0,
        icu_noncovid: 0,
        vent_covid: 0,
        vent_pui: 0,
        vent_noncovid: 0,
      };
    }
    if (!result.states[state]) {
      result.states[state] = {};
    }
    const mys = result.malaysia[e.date];
    result.states[state][e.date] = {
      bed_icu: parseInt(e["bed_icu"]),
      bed_icu_rep: parseInt(e["bed_icu_rep"]),
      bed_icu_total: parseInt(e["bed_icu_total"]),
      bed_icu_covid: parseInt(e["bed_icu_covid"]),
      vent: parseInt(e["vent"]),
      vent_port: parseInt(e["vent_port"]),
      icu_covid: parseInt(e["icu_covid"]),
      icu_pui: parseInt(e["icu_pui"]),
      icu_noncovid: parseInt(e["icu_noncovid"]),
      vent_covid: parseInt(e["vent_covid"]),
      vent_pui: parseInt(e["vent_pui"]),
      vent_noncovid: parseInt(e["vent_noncovid"]),
    };
    result.malaysia[e.date] = {
      bed_icu: mys.bed_icu + parseInt(e["bed_icu"]),
      bed_icu_rep: mys.bed_icu_rep + parseInt(e["bed_icu_rep"]),
      bed_icu_total: mys.bed_icu_total + parseInt(e["bed_icu_total"]),
      bed_icu_covid: mys.bed_icu_covid + parseInt(e["bed_icu_covid"]),
      vent: mys.vent + parseInt(e["vent"]),
      vent_port: mys.vent_port + parseInt(e["vent_port"]),
      icu_covid: mys.icu_covid + parseInt(e["icu_covid"]),
      icu_pui: mys.icu_pui + parseInt(e["icu_pui"]),
      icu_noncovid: mys.icu_noncovid + parseInt(e["icu_noncovid"]),
      vent_covid: mys.vent_covid + parseInt(e["vent_covid"]),
      vent_pui: mys.vent_pui + parseInt(e["vent_pui"]),
      vent_noncovid: mys.vent_noncovid + parseInt(e["vent_noncovid"]),
    };
  });
  const ref = db.ref("data/healthcare/icu");
  await ref.set(result);
  await getICUSummary();
  await commitRef.set(content.sha);
  return true;
};

const getPKRCData = async () => {
  const repo = "MoH-Malaysia/covid19-public";
  const file = "epidemic/pkrc.csv";
  const content = await getRepoContent(repo, file);
  const commitRef = db.ref("commit/healthcare/pkrc");
  const snapshot = await commitRef.once("value");
  if (content.sha === snapshot.val()) return false;
  const data = (await Papa.parsePromise(content.content)).data;
  const result = {
    malaysia: {},
    states: {},
  };
  data.forEach((e) => {
    const state = e.state.replace(/\s/g, "_").replace(/\./g, "").toLowerCase();
    if (!result.malaysia[e.date]) {
      result.malaysia[e.date] = {
        beds: 0,
        admitted_pui: 0,
        admitted_covid: 0,
        admitted_total: 0,
        discharge_pui: 0,
        discharge_covid: 0,
        discharge_total: 0,
        pkrc_covid: 0,
        pkrc_pui: 0,
        pkrc_noncovid: 0,
      };
    }
    if (!result.states[state]) {
      result.states[state] = {};
    }
    const mys = result.malaysia[e.date];
    result.states[state][e.date] = {
      beds: parseInt(e["beds"]),
      admitted_pui: parseInt(e["admitted_pui"]),
      admitted_covid: parseInt(e["admitted_covid"]),
      admitted_total: parseInt(e["admitted_total"]),
      discharge_pui: parseInt(e["discharge_pui"]),
      discharge_covid: parseInt(e["discharge_covid"]),
      discharge_total: parseInt(e["discharge_total"]),
      pkrc_covid: parseInt(e["pkrc_covid"]),
      pkrc_pui: parseInt(e["pkrc_pui"]),
      pkrc_noncovid: parseInt(e["pkrc_noncovid"]),
    };
    result.malaysia[e.date] = {
      beds: mys.beds + parseInt(e["beds"]),
      admitted_pui: mys.admitted_pui + parseInt(e["admitted_pui"]),
      admitted_covid: mys.admitted_covid + parseInt(e["admitted_covid"]),
      admitted_total: mys.admitted_total + parseInt(e["admitted_total"]),
      discharge_pui: mys.discharge_pui + parseInt(e["discharge_pui"]),
      discharge_covid: mys.discharge_covid + parseInt(e["discharge_covid"]),
      discharge_total: mys.discharge_total + parseInt(e["discharge_total"]),
      pkrc_covid: mys.pkrc_covid + parseInt(e["pkrc_covid"]),
      pkrc_pui: mys.pkrc_pui + parseInt(e["pkrc_pui"]),
      pkrc_noncovid: mys.pkrc_noncovid + parseInt(e["pkrc_noncovid"]),
    };
  });
  const ref = db.ref("data/healthcare/pkrc");
  await ref.set(result);
  await getPKRCSummary();
  await commitRef.set(content.sha);
  return true;
};

const uploadFile = async (file, fileName) => {
  const bucket = storage.bucket();
  const destination = `images/${fileName}`;
  const buffer = Buffer.from(file.split(",")[1], "base64");
  const output = await imagemin.buffer(buffer, {
    plugins: [imageminPngquant({quality: [0.3, 0.5]})],
  });

  await bucket
      .file(destination)
      .save(output, {
        public: true,
        gzip: true,
        metadata: {
          cacheControl: "public, max-age=31536000",
          contentType: "image/png",
          contentEncoding: "gzip",
        },
      });

  await bucket.file(destination).makePublic();

  const baseUrl = "https://firebasestorage.googleapis.com/v0/b/";
  return `${baseUrl}${bucket.name}/o/${encodeURIComponent(destination)}?alt=media`;
};

const generateSummaryChart = async (data, summary = {}) => {
  const width = 700;
  const height = 350;
  const chartJSNodeCanvas = new CanvasRenderService(
      width,
      height,
  );
  const labels = [];
  const first = new Array(180).fill(null);
  const second = new Array(180).fill(null);
  for (let i = 7; i < data.length; i++) {
    let total = 0;
    for (let j = 0; j < 7; j++) {
      total += data[i - j][1];
    }
    const d = new Date(data[i][0]);
    const label = (d.getDate() !== 1) ?
      "" : d.toLocaleString("en", {month: "short"});
    labels.push(label);
    if (data.length - i >= 14) first[i - 7] = Math.round(total / 7);
    if (data.length - i <= 14) second[i - 7] = Math.round(total / 7);
  }
  let secondBorderColor = "#383f43";
  let secondBackgroundColor = "#ebe9e7";
  if (summary.change > 0) {
    secondBorderColor = "#942514";
    secondBackgroundColor = "#f6d7d2";
  }
  if (summary.change <= 0) {
    secondBorderColor = "#005a30";
    secondBackgroundColor = "#cce2d8";
  }
  const config = {
    data: {
      labels,
      datasets: [{
        type: "line",
        data: first,
        pointRadius: 0,
        borderWidth: 2,
        borderColor: "#383f43",
        backgroundColor: "transparent",
      },
      {
        type: "line",
        data: second,
        pointRadius: 0,
        borderWidth: 2,
        borderColor: secondBorderColor,
        backgroundColor: secondBackgroundColor,
      }],
    },
    options: {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
            min: 0,
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
            fontColor: "#6b7276",
            fontSize: 20,
            fontStyle: 500,
          },
        }],
        yAxes: [{
          display: false,
        }],
      },
    },
  };
  return await chartJSNodeCanvas.renderToDataURL(config);
};

const computeSummary = (data) => {
  const currSevenDaysTot = data.slice(-7)
      .reduce((acc, cur) => acc + cur[1], 0);
  const prevSevenDaysTot = data.slice(data.length - 14, -7)
      .reduce((acc, cur) => acc + cur[1], 0);
  const change = (currSevenDaysTot - prevSevenDaysTot) / prevSevenDaysTot * 100;
  return {
    latest_date: data[data.length - 1][0],
    latest_value: data[data.length - 1][1],
    oldest_date: data[data.length - 14][0],
    current_seven_days_total: currSevenDaysTot,
    previous_seven_days_total: prevSevenDaysTot,
    change,
  };
};

const getTestingSummary = async () => {
  const ref = db.ref("data/testing/malaysia");
  const snapshot = await ref.limitToLast(187).once("value");
  const data = [];
  snapshot.forEach((e) => {
    const value = e.val();
    data.push([e.key, value.pcr + value["rtk-ag"]]);
  });
  const summary = computeSummary(data);
  const chart = await generateSummaryChart(data);
  summary.imageUrl = await uploadFile(chart, `summary/testing/${summary.latest_date}.png`);
  const summaryRef = db.ref("summary/testing");
  await summaryRef.set(summary);
  return true;
};

const getCasesSummary = async () => {
  const ref = db.ref("data/cases/malaysia");
  const snapshot = await ref.limitToLast(187).once("value");
  const data = [];
  snapshot.forEach((e) => {
    const value = e.val();
    data.push([e.key, value.cases_new]);
  });
  const summary = computeSummary(data);
  const chart = await generateSummaryChart(data, summary);
  summary.imageUrl = await uploadFile(chart, `summary/cases/${summary.latest_date}.png`);
  const summaryRef = db.ref("summary/cases");
  await summaryRef.set(summary);
  return true;
};

const getDeathsSummary = async () => {
  const ref = db.ref("data/deaths/malaysia");
  const snapshot = await ref.limitToLast(187).once("value");
  const data = [];
  snapshot.forEach((e) => {
    const value = e.val();
    data.push([e.key, value.deaths_new]);
  });
  const summary = computeSummary(data);
  const chart = await generateSummaryChart(data, summary);
  summary.imageUrl = await uploadFile(chart, `summary/deaths/${summary.latest_date}.png`);
  const summaryRef = db.ref("summary/deaths");
  await summaryRef.set(summary);
  return true;
};

const getVaccinationsSummary = async () => {
  const ref = db.ref("data/vaccinations/malaysia");
  const snapshot = await ref.limitToLast(187).once("value");
  const data = [];
  snapshot.forEach((e) => {
    const value = e.val();
    data.push([e.key, value.dose1_daily + value.dose2_daily, value]);
  });
  const summary = {
    ...computeSummary(data),
    ...data[data.length - 1][2],
  };
  const chart = await generateSummaryChart(data);
  summary.imageUrl = await uploadFile(chart, `summary/vaccinations/${summary.latest_date}.png`);
  const summaryRef = db.ref("summary/vaccinations");
  await summaryRef.set(summary);
  return true;
};

const getHospitalSummary = async () => {
  const ref = db.ref("data/healthcare/hospital/malaysia");
  const snapshot = await ref.limitToLast(187).once("value");
  const data = [];
  snapshot.forEach((e) => {
    const value = e.val();
    data.push([e.key, value.admitted_covid + value.admitted_pui]);
  });
  const summary = computeSummary(data);
  const chart = await generateSummaryChart(data, summary);
  summary.imageUrl = await uploadFile(chart, `summary/healthcare/hospital/${summary.latest_date}.png`);
  const summaryRef = db.ref("summary/healthcare/hospital");
  await summaryRef.set(summary);
  return true;
};

const getICUSummary = async () => {
  const ref = db.ref("data/healthcare/icu/malaysia");
  const snapshot = await ref.limitToLast(187).once("value");
  const icuData = [];
  const icuVentData = [];
  snapshot.forEach((e) => {
    const value = e.val();
    icuData.push([e.key, value.icu_covid + value.icu_pui]);
    icuVentData.push([e.key, value.vent_covid + value.vent_pui]);
  });
  const icuSummary = computeSummary(icuData);
  const icuChart = await generateSummaryChart(icuData, icuSummary);
  icuSummary.imageUrl = await uploadFile(icuChart, `summary/healthcare/icu/${icuSummary.latest_date}.png`);
  const icuSummaryRef = db.ref("summary/healthcare/icu");
  await icuSummaryRef.set(icuSummary);
  const icuVentSummary = computeSummary(icuVentData);
  const icuVentChart = await generateSummaryChart(icuVentData, icuVentSummary);
  icuVentSummary.imageUrl = await uploadFile(icuVentChart, `summary/healthcare/icu_vent/${icuVentSummary.latest_date}.png`);
  const icuVentSummaryRef = db.ref("summary/healthcare/icu_vent");
  await icuVentSummaryRef.set(icuVentSummary);
  return true;
};

const getPKRCSummary = async () => {
  const ref = db.ref("data/healthcare/pkrc/malaysia");
  const snapshot = await ref.limitToLast(187).once("value");
  const data = [];
  snapshot.forEach((e) => {
    const value = e.val();
    data.push([e.key, value.admitted_total]);
  });
  const summary = computeSummary(data);
  const chart = await generateSummaryChart(data, summary);
  summary.imageUrl = await uploadFile(chart, `summary/healthcare/pkrc/${summary.latest_date}.png`);
  const summaryRef = db.ref("summary/healthcare/pkrc");
  await summaryRef.set(summary);
  return true;
};

exports.syncGithub = functions.https.onRequest(async (req, res) => {
  const reqToken = functions.config().config.reqtoken;
  if (req.headers.authorization !== `Bearer ${reqToken}`) return res.status(401).send();

  try {
    const promises = await Promise.all([
      getMalaysiaTestsData(), // 0
      getMalaysiaCasesData(), // 1
      getStatesCasesData(), // 2
      getMalaysiaDeathsData(), // 3
      getStatesDeathsData(), // 4
      getVaccinationsData(), // 5
      getHospitalData(), // 6
      getICUData(), // 7
      getPKRCData(), // 8
    ]);
    if (promises.filter((e) => e).length > 0) {
      const lastUpdatedRef = db.ref("last_updated");
      await lastUpdatedRef.set(Date.now());
    }
    res.send({
      testing: {
        malaysia: promises[0],
      },
      cases: {
        malaysia: promises[1],
        states: promises[2],
      },
      deaths: {
        malaysia: promises[3],
        states: promises[4],
      },
      vaccinations: promises[5],
      healthcare: {
        hospital: promises[6],
        icu: promises[7],
        pkrc: promises[8],
      },
    });
  } catch (e) {
    console.log("error", e);
    res.send(e);
  }
});

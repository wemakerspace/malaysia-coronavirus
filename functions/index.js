const serviceAccount = require("./serviceaccount.json");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const Papa = require("papaparse");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://malaysia-coronavirus-default-rtdb.asia-southeast1.firebasedatabase.app",
});
const db = admin.database();

const githubBaseUrl = "https://raw.githubusercontent.com/";

Papa.parsePromise = async (url) => {
  const req = await fetch(url);
  const text = await req.text();
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

const getMalaysiaTestsData = async () => {
  const url = `${githubBaseUrl}/MoH-Malaysia/covid19-public/main/epidemic/tests_malaysia.csv`;
  const data = (await Papa.parsePromise(url)).data;
  const result = {};
  data.forEach((e) => {
    result[e.date] = {
      "rtk-ag": parseInt(e["rtk-ag"]),
      "pcr": parseInt(e["pcr"]),
    };
  });
  const ref = db.ref("data/testing/malaysia");
  await ref.set(result);
  return result;
};

const getCasesData = async () => {
  const url = `${githubBaseUrl}/MoH-Malaysia/covid19-public/main/epidemic/cases_state.csv`;
  const data = (await Papa.parsePromise(url)).data;
  const result = {
    malaysia: {},
    states: {},
  };
  data.forEach((e) => {
    const state = e.state.replace(/\s/g, "_").replace(/\./g, "").toLowerCase();
    if (!result.malaysia[e.date]) {
      result.malaysia[e.date] = {
        cases_new: 0,
      };
    }
    if (!result.states[state]) {
      result.states[state] = {};
    }
    const mys = result.malaysia[e.date];
    result.states[state][e.date] = {
      cases_new: parseInt(e["cases_new"]),
    };
    result.malaysia[e.date] = {
      cases_new: mys.cases_new + parseInt(e["cases_new"]),
    };
  });
  const ref = db.ref("data/cases");
  await ref.set(result);
  return result;
};

const getDeathsData = async () => {
  const url = `${githubBaseUrl}/MoH-Malaysia/covid19-public/main/epidemic/deaths_state.csv`;
  const data = (await Papa.parsePromise(url)).data;
  const result = {
    malaysia: {},
    states: {},
  };
  data.forEach((e) => {
    const state = e.state.replace(/\s/g, "_").replace(/\./g, "").toLowerCase();
    if (!result.malaysia[e.date]) {
      result.malaysia[e.date] = {
        deaths_new: 0,
      };
    }
    if (!result.states[state]) {
      result.states[state] = {};
    }
    const mys = result.malaysia[e.date];
    result.states[state][e.date] = {
      deaths_new: parseInt(e["deaths_new"]),
    };
    result.malaysia[e.date] = {
      deaths_new: mys.deaths_new + parseInt(e["deaths_new"]),
    };
  });
  const ref = db.ref("data/deaths");
  await ref.set(result);
  return result;
};

const getVaccinationsData = async () => {
  const url = `${githubBaseUrl}/CITF-Malaysia/citf-public/main/vaccination/vax_state.csv`;
  const data = (await Papa.parsePromise(url)).data;
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
  return result;
};

const getHospitalData = async () => {
  const url = `${githubBaseUrl}/MoH-Malaysia/covid19-public/main/epidemic/hospital.csv`;
  const data = (await Papa.parsePromise(url)).data;
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
  return result;
};

const getICUData = async () => {
  const url = `${githubBaseUrl}/MoH-Malaysia/covid19-public/main/epidemic/icu.csv`;
  const data = (await Papa.parsePromise(url)).data;
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
  return result;
};

const getPKRCData = async () => {
  const url = `${githubBaseUrl}/MoH-Malaysia/covid19-public/main/epidemic/pkrc.csv`;
  const data = (await Papa.parsePromise(url)).data;
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
  return result;
};

exports.syncGithub = functions.https.onRequest(async (req, res) => {
  try {
    const promises = await Promise.all([
      getMalaysiaTestsData(),
      getCasesData(),
      getDeathsData(),
      getVaccinationsData(),
      getHospitalData(),
      getICUData(),
      getPKRCData(),
    ]);
    res.send({
      testing: {
        malaysia: promises[0],
      },
      cases: promises[1],
      deaths: promises[2],
      vaccinations: promises[3],
      healthcare: {
        hospital: promises[4],
        icu: promises[5],
        pkrc: promises[6],
      },
    });
  } catch (e) {
    console.log("error", e);
    res.send(e);
  }
});

const computeSummary = (data) => {
  const currSevenDaysTot = data.slice(7, 14)
      .reduce((acc, cur) => acc + cur[1], 0);
  const prevSevenDaysTot = data.slice(0, 6)
      .reduce((acc, cur) => acc + cur[1], 0);
  const change = (currSevenDaysTot - prevSevenDaysTot) / prevSevenDaysTot * 100;
  return {
    latest_date: data[13][0],
    latest_value: data[13][1],
    oldest_date: data[0][0],
    current_seven_days_total: currSevenDaysTot,
    previous_seven_days_total: prevSevenDaysTot,
    change,
  };
};

const getTestingSummary = async () => {
  const ref = db.ref("data/testing/malaysia");
  const snapshot = await ref.limitToLast(14).once("value");
  const data = [];
  snapshot.forEach((e) => {
    const value = e.val();
    data.push([e.key, value.pcr + value["rtk-ag"]]);
  });
  const summary = computeSummary(data);
  const summaryRef = db.ref("summary/testing");
  await summaryRef.set(summary);
  return summary;
};

const getCasesSummary = async () => {
  const ref = db.ref("data/cases/malaysia");
  const snapshot = await ref.limitToLast(14).once("value");
  const data = [];
  snapshot.forEach((e) => {
    const value = e.val();
    data.push([e.key, value.cases_new]);
  });
  const summary = computeSummary(data);
  const summaryRef = db.ref("summary/cases");
  await summaryRef.set(summary);
  return summary;
};

const getDeathsSummary = async () => {
  const ref = db.ref("data/deaths/malaysia");
  const snapshot = await ref.limitToLast(14).once("value");
  const data = [];
  snapshot.forEach((e) => {
    const value = e.val();
    data.push([e.key, value.deaths_new]);
  });
  const summary = computeSummary(data);
  const summaryRef = db.ref("summary/deaths");
  await summaryRef.set(summary);
  return summary;
};

const getVaccinationsSummary = async () => {
  const ref = db.ref("data/vaccinations/malaysia");
  const snapshot = await ref.limitToLast(1).once("value");
  const data = [];
  snapshot.forEach((e) => {
    const value = e.val();
    data.push([e.key, value]);
  });
  const summary = {
    latest_date: data[0][0],
    ...data[0][1],
  };
  const summaryRef = db.ref("summary/vaccinations");
  await summaryRef.set(summary);
  return summary;
};

exports.generateSummaryReport = functions.https.onRequest(async (req, res) => {
  const testing = await getTestingSummary();
  const cases = await getCasesSummary();
  const deaths = await getDeathsSummary();
  const vaccinations = await getVaccinationsSummary();
  const result = {
    testing,
    cases,
    deaths,
    vaccinations,
    // healthcare: {
    //   hospital: {},
    //   icu: {},
    //   pkrc: {},
    // },
  };
  res.send(result);
});

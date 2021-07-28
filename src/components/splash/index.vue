<template>
  <div class="h-screen bg-gray-800 p-4 grid items-center text-center">
    <div class="grid gap-8 lg:gap-12 justify-items-center">
      <h1
        class="text-4xl lg:text-5xl leading-tight font-semibold text-gray-100"
      >
        Coronavirus<br />(COVID-19)<br />in Malaysia
      </h1>
      <div class="lds-ellipsis opacity-80">
        <div />
        <div />
        <div />
        <div />
      </div>
      <div
        :class="{ 'text-red-300': error }"
        class="text-gray-400 text-sm whitespace-pre-line leading-5"
      >
        <span v-if="error"
          >Oh no! Something went wrong.<br />
          <u class="cursor-pointer" @click="reload"
            >Try refresh the page?</u
          ></span
        >
        <span v-else
          >Checking your browser before accessing<br />malaysia-coronavirus.web.app
          ...</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  getToken,
} from "firebase/app-check";

import { firebaseApp } from "@/firebase/index.js";

export default {
  data: () => ({
    loading: true,
    error: false,
  }),
  async mounted() {
    try {
      const start = performance.now();
      const appCheck = initializeAppCheck(firebaseApp, {
        provider: new ReCaptchaV3Provider(
          import.meta.env.VITE_FIREBASE_APP_CHECK_KEY
        ),
        isTokenAutoRefreshEnabled: true,
      });
      await getToken(appCheck);
      const end = performance.now();
      if (end - start <= 700) {
        setTimeout(() => {
          this.$emit("loaded");
        }, 700 - (end - start));
      }
    } catch (e) {
      this.error = true;
    }
  },
  methods: {
    reload() {
      location.reload();
    },
  },
};
</script>

<style scoped lang="scss">
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);

    &:nth-child(1) {
      left: 8px;
      animation: lds-ellipsis1 0.6s infinite;
    }
    &:nth-child(2) {
      left: 8px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    &:nth-child(3) {
      left: 32px;
      animation: lds-ellipsis2 0.6s infinite;
    }
    &:nth-child(4) {
      left: 56px;
      animation: lds-ellipsis3 0.6s infinite;
    }
  }
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>

<template>
  <div class="w-100 h-100 question-bg">
    <div class="row h-100 d-flex align-self-lg-end">
      <div class="col-lg-5 "></div>
      <div class="col-lg-7 h-100">
        <div class=" justify-content-center h-100 d-lg-grid p-0 p-lg-0 m-0 d-lg-flex pe-lg-5 mb-lg-5">
          <div class="jumbotron align-self-lg-center  rounded p-3 p-lg-5 my-3 mx-auto text-light">
            <!--     style="background: rgba(255,255,255,0.85)"-->
            <h1 class="mb-lg-5">نظرسنجی نودالیت دراگون</h1>

            <div v-if="errors.length" class="alert alert-danger d-flex justify-content-center">
              <ul>
                <li v-for="error in errors">{{ error }}</li>
              </ul>
            </div>
            <div v-show="step==1">
              <p>با شرکت در نظرسنجی مارا در ارائه خدمات بهتر و بهود کیفیت محصولات
                یاری کنید.
              </p>
              <p> برای شرکت در نظرسنجی لطفا شماره موبایلت رو وارد کن
              </p>
              <div class="row justify-content-center">
                <div class="col-lg-8 mb-3">
                  <input type="text" id="mobile" class="form-control en bg-none w-100" placeholder="091- - - - - - - -">
                </div>
                <div class="col-12">
                  <button class="btn btn-info" @click.prevent="getOtp">دریافت کد تایید</button>
                </div>

              </div>
            </div>
            <div v-if="step==2" class="col-lg-8 mx-auto">
              <p>لطفا کد تاییدی که در پیامک دریافت کردی رو وارد کن</p>
              <div class="d-flex justify-content-between flex-row-reverse w-100">
                <div class="mb-3">
                  <input type="number" @input="autoTab($event)" id="code1" class="form-control code bg-none "
                         minLength="1" maxLength="1" min="0" max="9">
                </div>
                <div class="mb-3">
                  <input type="number" @input="autoTab($event)" id="code2" class="form-control code bg-none "
                         minLength="1" maxLength="1" min="0" max="9">
                </div>
                <div class="mb-3">
                  <input type="number" @input="autoTab($event)" id="code3" class="form-control code bg-none "
                         minLength="1" maxLength="1" min="0" max="9">
                </div>
                <div class="mb-3">
                  <input type="number" @input="autoTab($event)" id="code4" class="form-control code bg-none "
                         minLength="1" maxLength="1" min="0" max="9">
                </div>


              </div>
              <div class=" d-flex justify-content-between">
                <div class="text-info">
                  <p v-show="time">00:<span id="time">{{ time }}</span></p>
                </div>
                <small v-if="time==0" class="text-info" @click.prevent="resend">ارسال دوباره کد</small>
                <small v-else class="text-secondary">ارسال دوباره کد</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import {onMounted, ref, setTransitionHooks} from "vue";
import App from "@/App.vue";

export default {
  setup() {
    const url = App.setup().url;
    const errors = ref([]);
    const step = ref(1);
    const time = ref(59);

    const getOtp = () => {
      document.querySelector('#mobile').classList.remove('hasError')
      errors.value = []
      let mobile = document.querySelector('#mobile').value;
      if (mobile == '') {
        document.querySelector('#mobile').classList.add('hasError')
        errors.value.push('لطفا شماره موبایلت رو وارد کن')
      }
      if (!mobile.startsWith('09')) {
        document.querySelector('#mobile').classList.add('hasError')
        errors.value.push('شماره موبایل باید با 09 شروع بشه')

      }
      if (mobile.length !== 11) {
        document.querySelector('#mobile').classList.add('hasError')
        errors.value.push('شماره موبایل باید 11 رقم باشه')
      }
      if (mobile.length===11&& mobile.startsWith('09')){
        // mobile.value = document.querySelector('#mobile').value;
        axios.post(url + 'mobile/otp', {
          mobile: mobile
        }).then((response) => {
          step.value = 2
          counter();
        }).catch((error) => {
          errors.value.push('در ارسال پیامک مشکلی پیش آمد. لطفا دوباره تلاش کن.')
        })
      }



    }

    const editNumber = () => {
      location.reload();
    }
    const resend = () => {

      getOtp();
    }
    const counter = () => {

      var distance = 59;
      var x = null;
      clearInterval(x);
      time.value = 0;
      x = setInterval(function () {

        // document.getElementById("time").classList.remove('d-none');


        distance--;
        time.value = distance;
        var t = time.value < 10 ? "0" : "";
        let element = document.getElementById("time");
        if(element) element.innerHTML = t + time.value;

        if (distance < 1) {
          clearInterval(x);
          // document.getElementById("time").classList.add('d-none');

        }
      }, 1000);

      time.value = 0;
      // if(time.value === 0){
      //   document.getElementById('resend').removeAttribute('disabled')
      // }

    }
  onMounted(()=>{
    mobile.value = document.getElementById('mobile').value.toString();
  })
    const autoTab = (e) => {
      errors.value = []
      let code =
          document.getElementById("code1").value +
          document.getElementById("code2").value +
          document.getElementById("code3").value +
          document.getElementById("code4").value;

      if (code.length === 4) {

        axios.post(url + 'mobile/verify', {
          mobile: document.getElementById('mobile').value,
          scope: 'user',
          code: document.getElementById("code1").value + document.getElementById("code2").value + document.getElementById("code3").value + document.getElementById("code4").value
        })
            .then((res) => {
              if (res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res.data.user))
                // localStorage.setItem('token', JSON.stringify(res.data.access_token))
                // localStorage.setItem('expire', JSON.stringify(res.data.expire));
                localStorage.setItem('user', JSON.stringify({mobile:mobile.value,id:1,polls:[]}))
                let user = JSON.parse(localStorage.getItem('user'));
                if (user.polls.length){
                  step.value = 3;
                  errors.value.push('شما قبلا در نظرسنجی شرکت کرده اید. با تشکر از همراهی شما.')
                }else {
                  window.location = '/poll';
                }
              } else {
                console.log(res)
              }
            }).catch((err) => {
          errors.value.push = err.response.data.message;
        })

      }

      if (e.target.value.length === e.target.maxLength && code.length < 4) {
        e.target.parentElement.nextElementSibling?.firstChild?.focus();
      }
    }

    return {
      getOtp, url, errors, step, time, autoTab, resend, counter, editNumber
    }
  }
}
</script>


<style scoped>

</style>
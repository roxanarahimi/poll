<template>
  <div class="w-100 h-100 question-bg"  >
    <div class="row h-100 d-flex align-self-lg-end">
      <div class="col-lg-5 "></div>
      <div class="col-lg-7 h-100">
        <div class=" justify-content-center h-100 d-lg-grid p-0 p-lg-0 m-0 d-lg-flex pe-lg-5 mb-lg-5">
     <div class="jumbotron align-self-lg-end rounded p-3 p-lg-5 my-3 mx-auto text-light" ><!--     style="background: rgba(255,255,255,0.85)"-->
            <h1 class="mb-lg-5">نظرسنجی نودالیت دراگون</h1>
            <hr>
            <p v-if="errors[questionIndex]" class="alert alert-danger">
              {{ error }}
            </p>
            <div class="" v-for="(question, index) in quiz">
              <div v-show="index === questionIndex">

                <h4 class="mt-lg-5 mb-lg-3">{{ question.question }}</h4>

                <div class="">
                  <div class="mx-auto text-start mt-3">
                    <div v-for="answer in question.options" class="form-check">
                      <label class="form-check-label">
                        <input class="form-check-input" type="radio"
                               :value="answer.id"
                               :name="index"
                               v-model="responses[index]">
                        {{ answer.option }}
                      </label>
                    </div>

                  </div>
                </div>
                <div class="mt-3 mt-lg-5 d-flex justify-content-between">
                  <button
                      class="btn btn-secondary"
                      v-if="questionIndex > 0"
                      @click="prev">
                    قبلی
                  </button>
                  <div v-else></div>
                  <button class="btn btn-primary" @click="next">
                    بعدی
                  </button>
                </div>
              </div>
            </div>

            <div v-if="quiz.length" v-show="questionIndex === quiz?.length">
              <p v-if="messageOk === true" class="alert alert-success">
                {{ message }}
              </p>
              <p v-if="messageNotOk=== true" class="alert alert-danger">
                {{ message }}
              </p>
              <button v-if="messageOk!==true" class="btn btn-success" @click="save">
                ارسال
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {onBeforeMount, onMounted, ref} from "vue";
import App from "@/App.vue";

export default {
  setup() {
    const quiz = ref([]);

    const questionIndex = ref(0)
    const responses = ref([])
    const errors = ref([])
    const error = ref('')

    const prev = () => {
      questionIndex.value--;
    }
    const next = () => {
      if (responses.value[questionIndex.value] === undefined) {
        errors.value[questionIndex.value] = 1;
        error.value = 'لطفا یگ گزینه را انتخاب کنید';
      } else {
        errors.value[questionIndex.value] = 0;
        questionIndex.value++;
      }
    }
    const getData = () => {
      axios.get(App.setup().url+'questions')
          .then((response) => {
            quiz.value = response.data;
            console.log(quiz.value)
          })
    }


    const messageOk = ref();
    const messageNotOk = ref();
    const message = ref('');
    const save = () => {
      console.log(responses.value)
      axios.post(App.setup().url+'saveAnswer',
          {
            answers: responses.value,
            user_id: 1

          }).then((response) => {
        messageOk.value = true;
        messageNotOk.value = false;
        message.value = 'با تشکر از همراهی شما، نظر شما ثبت شد.';
      }).catch((error) => {
        console.error('notOk', error)
        messageOk.value = false;
        messageNotOk.value = true;
        message.value = 'نظر شما ثبت نشد، لطفا دوباره تلاش کنید.';
      })

    }

    onMounted(() => {
      getData();
    })
    return {
      quiz, questionIndex, responses, errors, error,
      prev, next, save, getData
      , message, messageOk, messageNotOk
    }
  }
}
</script>

<style scoped>

</style>
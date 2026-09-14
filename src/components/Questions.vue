<template>

  <div class="text-center text-light p-0 p-lg-0 m-0 mb-lg-5">
    <div class="jumbotron bg-dark text-light  rounded p-3 px-4 mx-auto " >
            <p v-if="errors[questionIndex]" class="alert alert-danger">
              {{ error }}
            </p>
            <div class="" v-for="(question, index) in quiz">
              <div v-show="index === questionIndex">

                <h4 class=" mb-lg-3">{{ question.question }}</h4>

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

            <div class="my-5" v-if="quiz.length > 0" v-show="questionIndex === quiz?.length">
              <p v-if="messageOk === true" class="alert alert-success">
                {{ message }}
              </p>
              <p v-if="messageNotOk=== true" class="alert alert-danger">
                {{ message }}
              </p>
              <button v-if="messageOk!==true" class="mt-5 btn btn-success" @click="save">
                ثبت نهایی
              </button>
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
        error.value = 'لطفا یگ گزینه را انتخاب کن';
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
            user_id: JSON.parse(localStorage.getItem('user')).id

          }).then((response) => {
        messageOk.value = true;
        messageNotOk.value = false;
        message.value = 'با تشکر از همراهیت، نظرت ثبت شد.';
      }).catch((error) => {
        console.error('notOk', error)
        messageOk.value = false;
        messageNotOk.value = true;
        message.value = 'نظرت ثبت نشد، لطفا دوباره تلاش کن.';
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
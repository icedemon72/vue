<template>
    <div class="questions animate__animated animate__fadeInUp" id="quiz">
        <div v-if="indexCount < count">
            <p>{{ indexCount + 1 }}/{{ count }}</p>
            <p class="question_text">
                Q: {{ questions[index]['question'] }}
            </p>
            <div id="questionList">
                <label :for="key" :key="key" class="question_label" v-for="answer, key in questions[index]['answers']" :class="[{'hover_ans' : selectedAnswer == ''},
                            {'wrong' : selectedAnswer == key},
                            {'corr' : key == questions[index]['correctAnswer'] && selectedAnswer != ''}]">
                            <input type="radio" :id="key" class="hidden" :value="key" @change="answered($event)"
                                v-model="selectedAnswer" :disabled="selectedAnswer != ''" />
                            {{ answer }} <br />
                </label>
            </div>
            <div>
                <button class="btn" v-show="selectedAnswer != '' && indexCount < count-1" @click="nextQuestion">
                    &gt;
                </button>
                <button class="btn" v-show="selectedAnswer != '' && indexCount == count-1"
                    @click="showResults">
                    Finish
                </button>
            </div>
        </div>
        <div v-else>
            <h2 class="res_header">Results</h2>
            <div id="res">
                <p>
                    Correct Answers:
                    <span class="corr_answer">{{ correctAnswer }}</span>
                </p>
                <p>
                    Wrong Answers:
                    <span class="wrong_answer">{{ wrongAnswer }}</span>
                </p>
            </div>
            <div id="res">
                <div>
                    <button id="sbmBtn" class="btn" @click="submit">
                        Submit results?
                    </button>
                </div>
                <div>
                    <button class="btn" @click="resetQuiz">
                        Play again?
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import 'animate.css';
    const url = "http://localhost:3000/scores"
    export default {
        name: 'Quiz',
        components: {},
        data() {
            return {
                resName: '',
                time: '',
                index: 0,
                indexArr: [0],
                selectedAnswer: '',
                correctAnswer: 0,
                wrongAnswer: 0,
                indexCount: 0,
                count: 5, 
                questions: [],
                submitted: false
            }
        },
        methods: {
            check(a, key, questions, index) {
                if(a === '') {
                    return 'hover_ans';
                }
                else if (a === key) {
                    return 'wrong';
                }
                else if (questions[index]['correctAnswer'] && a !== '') {
                    return 'corr';
                }
            },
            answered(e) {
                this.selectedAnswer = e.target.value
                if(this.selectedAnswer == this.questions[this.index]['correctAnswer'])
                    this.correctAnswer++
                else
                    this.wrongAnswer++
            },
            nextQuestion() {
                this.indexCount++
                let ind = Math.floor(Math.random() * this.questions.length);
                
                while(this.indexArr.includes(ind)) {
                    ind = Math.floor(Math.random() * this.questions.length);
                }

                this.indexArr.push(ind);
                this.index = ind;
                this.selectedAnswer = '';
            },
            async showResults() {
                document.getElementById('nav').style.display = 'block';
                this.indexCount++;
                const num = await axios.get('http://localhost:3000/completed');
                let res = num.data.number;
                let score = num.data.score + this.correctAnswer;
                res++;
                await axios.post('http://localhost:3000/completed', {number: res, score: score});
            },
            resetQuiz() {
                let t = Math.floor(Math.random() * this.questions.length);
                this.indexCount = 0;
                this.indexArr = [t];
                this.index = t;
                this.selectedAnswer = '';
                this.correctAnswer = 0;
                this.wrongAnswer = 0;
                this.submitted = 0;
                document.getElementById('nav').style.display = 'none';
            },
            async submit() {
                if(!this.submitted) {
                    this.resName = prompt("Enter your name: ");
                    if(!this.resName) {
                        this.resName = "anon";
                    }
                    let date = new Date();
                    let day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate();
                    let month = (date.getMonth() + 1 < 10) ? `0${date.getMonth()}` : date.getMonth();
                    let year = date.getFullYear();
                    let hours = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours();
                    let minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes();
                    this.time = `${day}/${month}/${year} ${hours}:${minutes}`
                    await axios.post(url, {name: this.resName, result: this.correctAnswer, time: this.time});
                    this.submitted = true;
                    document.getElementById('sbmBtn').innerHTML = "Successfully submitted!";
                }
            }
        },
        async created() {
            try {
                const res = await axios.get('http://localhost:3000/questions');
                this.questions = res.data;
            } catch(e) {
                console.err(e);
            }
            this.resetQuiz();
            document.getElementById('nav').style.display = 'none';
        }
    }

</script>

<style scoped>
    #questionList {
        margin-top: 20px;
    }

    #res {
        margin-top: 50px;
    }

    #show {
        display: none;
    }

    @media screen and (max-width: 508px) {
        #quiz {
            position: static;
            width: 100%;
            height: 50%;
            margin: auto;
            margin-top: 100px;
            box-shadow: none;
            background-color: #131516;
        }
        
        .btn {
            background-color: #131516;
        }       

        .btn:hover {
            cursor: pointer;
            background-color: rgb(214, 214, 214);
            color: #131516;
        } 
    }
    @media screen and (max-height: 650px) {
        .question_text {
            text-align: center;
        }

        #quiz {
            height: 50%;
            margin-top: 10%;
        } 
    }

    @media screen and (max-height: 440px) {
        #quiz {
            height: auto;
            margin-top: 50px;
        }
    }

</style>
<template>
    <div id="arr" class="arrow" @click="showPrompt">&lt;</div>
    <div id="prompt" class="prompt animate__animated animate__fadeInDown">
        <div>
            <h3>Are you sure you want to leave? <br /> Your quiz progression will be lost!</h3>
            <p class="prompt_text">You still haven't finished your quiz, there are {{ 5 - (correctAnswer + wrongAnswer) }} unanswered questions left!</p>
        </div>
        <div class="buttons">
            <router-link to="/"><button @click="navRestore">Yes</button></router-link>
            <button @click="showPrompt(false)">No</button>
        </div>
    </div>
    <div class="questions animate__animated animate__fadeInUp" id="quiz">
        <div v-if="indexCount < count">
            <div class="question_dots">
                <p id="questionDot">
                    <span>&#9632;</span>
                    <span>&#9632;</span>
                    <span>&#9632;</span>
                    <span>&#9632;</span>
                    <span>&#9632;</span>
                </p>
            </div>
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
            navRestore() {
                document.getElementById('nav').style.display = 'block';
                document.getElementById('arr').style.display = 'none';
            },
            showPrompt(bool = true) {
                document.getElementById('prompt').style.display = (bool) ? 'block' : 'none';
            },
            spanColor(node, bool = true) {
                document.getElementById('questionDot').children[node].style.color = (bool) ? "rgb(81, 224, 68)" : "#ba1425";
            },
            answered(e) {
                this.selectedAnswer = e.target.value
                if(this.selectedAnswer === this.questions[this.index]['correctAnswer']) {
                    this.correctAnswer++
                    this.spanColor(this.indexCount);
                }
                else {
                    this.wrongAnswer++;
                    this.spanColor(this.indexCount, false);
                }
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
                this.navRestore();
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
                document.getElementById('arr').style.display = 'block';
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
    .arrow {
        background-color: #0c0c0c;
        color: #ffffff;
        text-align: center;
        text-decoration: none;
        width: 50px;
        height: 50px;
        line-height: 50px;
        position: fixed;
        top: 20px;
        left: 20px;
        border: 1px solid #0c0c0c;
        border-radius: 100%;
        transition: all 0.4s;
        -webkit-transition: all 0.4s;
        cursor: pointer;
    }

    .prompt {
        display: none;
        position: fixed;
        width: 500px;
        height: 400px;
        z-index: 2;
        top: 50%;
        left: 50%;
        margin: -200px 0 0 -250px;
        text-align: center;
        background-color: #0c0c0c;
    }

    .prompt_text {
        margin-top: 20px;
        margin-left: 5%;
        margin-right: 5%;
        text-align: justify;
    }

    .buttons {
        margin-top: 200px;
    }

    .buttons button {
        width: 45%;
        cursor: pointer;
        padding-top: 8px;
        padding-bottom: 8px;
        background-color: #0c0c0c;
        color: #e8e6e3;
        border: 0;
        transition: all 0.4s;
        -webkit-transition: all 0.4s;
        border-radius: 3px;
    }

    .buttons button:hover {
        width: 45%;
        background-color: rgb(214, 214, 214);
        color: #131516;
    }

    .arrow:hover {
        background-color: #131516;
    }

    .question_dots {
        position: fixed;
        z-index: 1;
        left: 430px;
        top: -7px;
    }

    #questionDot {
        font-size: 20px;
    }

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
        
        .prompt {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            margin: auto;
        }

        .prompt > div > h3 {
            margin-top: 20%;
        }

        .prompt_text {
            margin-top: 70px;
        }

        .question_dots {
            top: -23px;
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
            margin-top: 100px;
        } 

        .question_dots {
            display: none;
        }

        .prompt {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            margin: auto;
        }

        .prompt > div > h3 {
            margin-top: 150px;
        }

        .prompt_text {
            text-align: center;
        }

        .buttons {
            margin-top: 100px;
        }
    }

    @media screen and (max-height: 440px) {
        #quiz {
            height: auto;
            margin-top: 50px;
        }

        .prompt > div > h3 {
            margin-top: 50px;
        }
    }

</style>
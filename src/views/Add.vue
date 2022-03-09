<template>
    <div id="quiz" class="animate__animated animate__fadeInUp">
        <h2>Add a Question</h2>
        <h3>Question:</h3>
        <input placeholder="Your question goes here..." id="question" type="text" />

        <p class="correct">Correct answer:</p>
        <input placeholder="The correct answer goes here..." id="corrAns" type="text" />

        <p class="wr">Wrong answer 1:</p>
        <input placeholder="A wrong answer goes here..." id="wrAns1" type="text" />

        <p class="wr">Wrong answer 2:</p>
        <input placeholder="A wrong answer goes here..." id="wrAns2" type="text" />
        
        <p class="wr">Wrong answer 3:</p>
        <input placeholder="A wrong answer goes here..." id="wrAns3" type="text" />
        
        <button id="btn" class="x btn" @click="submitReq">Submit!</button>
        <button id="clear" class="n btn" @click="clear">Submit Another Question?</button>
    </div>
</template>

<script>
    import 'animate.css';
    import axios from 'axios';
    export default {
        name: 'Add',
        components: {},
        data() {
            return {
                submitted: false,
                question: '',
                answers: {
                    a: '',
                    b: '',
                    c: '',
                    d: '',
                },
                corr: ''
            }
        },
        methods: {
            async submitReq() {
                if(!this.submitted) {
                    let arr = ['a', 'b', 'c', 'd'];
                    this.question = document.getElementById('question').value;
                    if(!this.question.endsWith('?')) {
                        this.question += '?';
                    }
                    this.corr = arr[Math.floor(Math.random()*arr.length)]; // izabran je B
                    arr.splice(arr.indexOf(this.corr), 1);
                    let wrongAnswers = [document.getElementById('wrAns1').value, document.getElementById('wrAns2').value, document.getElementById('wrAns3').value];
                    let object = {
                        [arr[0]]: wrongAnswers[0],
                        [arr[1]]: wrongAnswers[1],
                        [arr[2]]: wrongAnswers[2],
                        [this.corr]: document.getElementById('corrAns').value
                    };
                    let objOrdered = Object.keys(object).sort().reduce((obj, key) => { 
                        obj[key] = object[key]; 
                        return obj;
                        }, 
                        {}
                    );
                    if(!this.question || !document.getElementById('wrAns1').value || !document.getElementById('wrAns2').value || !document.getElementById('wrAns3').value || !document.getElementById('corrAns').value) {
                        alert('Error while submitting the answers, check all the fields and try again!');
                    } else {
                        await axios.post('http://localhost:3000/questions', {question: this.question, correctAnswer: this.corr, answers: objOrdered});
                        document.getElementById('btn').innerHTML = 'Successfully submitted!';
                        document.getElementById('clear').style.display = 'block';
                        this.submitted = true;
                    }
                    
                }
            },
            clear() {
                location.reload();
            }
        }
    }
</script>

<style scoped>
    h1 {
        margin-left: 5%;
        margin-right: 5%;
    }

    h3, p, input {
        text-align: start;
        margin-left: 20px;
    }

    input {
        height: 20px;
        text-align: start;
        display: block;
        width: 640px;
        font-family: ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
    }

    .correct {
        color: rgb(190, 236, 190);
    }

    .wr {
        color:rgb(224, 158, 158);
    }

    #clear {
        display: none;
    }

    .x {
        margin-top: 30px;
    }

    #quiz {
        width: 700px;
        height: 530px;
        margin: -265px 0 0 -350px;
    }

    @media screen and (max-height: 800px) {
        #quiz {
            position: static;
            margin: auto;
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

    @media screen and (max-width: 800px) {
        #quiz {
            position: static;
            width: 100%;
            height: auto;
            margin: auto;
            margin-top: 10px;
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

        input {
            width: 90%;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>

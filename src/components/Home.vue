<template>
    <h1 class="animate__animated animate__fadeIn">Home</h1>
    <div class="animate__animated animate__fadeInUp">
        <p>Welcome, this is the homepage.</p>
        <p>In order to play the quiz, all you need to do is press the 'PLAY' button above.</p>
        <p>As of now, this quiz has been completed <span class="green">{{ number }}</span> times! The average score is: <span class="green">{{ avgScore }}</span>. There are <span class="green">{{ questionNum }}</span> questions, you can help by adding more - in order to do so, press the 'Add a question' button. After the quiz completition you can choose to submit your result, to see every result that's been submitted head to the 'Results' tab.</p>
        <p>That's it, have fun!</p>
    </div>
</template>

<script>
    import 'animate.css'
    import axios from 'axios';
    export default {
        name: "Home",
        components: {},
        data() {
            return {
                number: 0,
                avgScore: 0,
                questionNum: 0
            }
        },
        async created() {
            const res = await axios.get('http://localhost:3000/completed');
            this.number = res.data.number;
            const questRes = await axios.get('http://localhost:3000/questions');
            this.questionNum = questRes.data.length;
            if(this.number) {
                this.avgScore = (res.data.score / res.data.number).toFixed(2);
            }
        }
    }
</script>


<style scoped>
    h1 {
        margin-left: 5%;
        margin-right: 5%;
    }

    p {
        margin-left: 5%;
        margin-right: 5%;
        text-align: justify;
    }

    .green {
        color: rgb(161, 253, 158);
    }
</style>


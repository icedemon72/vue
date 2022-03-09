<template>
    <h1 class="animate__animated animate__fadeIn">Home</h1>
    <div class="animate__animated animate__fadeInUp">
        <p>Welcome, this is the homepage.</p>
        <p>In order to play the quiz, all you need to do is press the 'PLAY' button above.</p>
        <p>As of now, this quiz has been completed <span class="green">{{ number }}</span> times! The average score is: <span class="green">{{ avgScore }}</span>. There are <span class="green">{{ questionNum }}</span> questions, you can help by adding more - in order to do so, press the 'Add a question' button. After the quiz completion you can choose to submit your result, to see every result that's been submitted head to the 'Results' tab.</p>
        <p>That's it, have fun!</p>
    </div>
    <div class="wave">   
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="0c0c0c" fill-opacity="1" d="M0,160L13.3,176C26.7,192,53,224,80,213.3C106.7,203,133,149,160,133.3C186.7,117,213,139,240,165.3C266.7,192,293,224,320,234.7C346.7,245,373,235,400,202.7C426.7,171,453,117,480,85.3C506.7,53,533,43,560,80C586.7,117,613,203,640,224C666.7,245,693,203,720,208C746.7,213,773,267,800,245.3C826.7,224,853,128,880,112C906.7,96,933,160,960,160C986.7,160,1013,96,1040,96C1066.7,96,1093,160,1120,192C1146.7,224,1173,224,1200,208C1226.7,192,1253,160,1280,149.3C1306.7,139,1333,149,1360,144C1386.7,139,1413,117,1427,106.7L1440,96L1440,320L1426.7,320C1413.3,320,1387,320,1360,320C1333.3,320,1307,320,1280,320C1253.3,320,1227,320,1200,320C1173.3,320,1147,320,1120,320C1093.3,320,1067,320,1040,320C1013.3,320,987,320,960,320C933.3,320,907,320,880,320C853.3,320,827,320,800,320C773.3,320,747,320,720,320C693.3,320,667,320,640,320C613.3,320,587,320,560,320C533.3,320,507,320,480,320C453.3,320,427,320,400,320C373.3,320,347,320,320,320C293.3,320,267,320,240,320C213.3,320,187,320,160,320C133.3,320,107,320,80,320C53.3,320,27,320,13,320L0,320Z" style="--darkreader-inline-fill:#007acc;"></path>
        </svg>
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

    .wave {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
    }

</style>


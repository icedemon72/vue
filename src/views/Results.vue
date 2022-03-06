<template>
    <h1 class="animate__animated animate__fadeIn">Results</h1>
    <table class="animate__animated animate__fadeInUp">
        <thead>
            <tr>
                <td>#</td>
                <td>User</td>
                <td>Score</td>
                <td>Timestamp</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="res of results" :key="res.id">
                <td>{{ res.id }}</td>
                <td>{{ res.name }}</td>
                <td>{{ res.result }}</td>
                <td>{{ res.time }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import axios from 'axios';
    import 'animate.css';
    export default {
        name: 'Results',
        components: {},
        data() {
            return {
                results: []
            }
        },
        async created() {
            try {
                const res = await axios.get('http://localhost:3000/scores');
                this.results = res.data;
            } catch (e) {
                console.error(e);
            }
        }
    }
</script>

<style scoped>
    h1 {
        margin-left: 5%;
        margin-right: 5%;
    }

    table {
        margin: auto;
        padding: auto;
        width: 90%;
        text-align: start;
        border-collapse: collapse;
    }

    thead > tr > td {
        font-weight: bold;
        border-bottom: 2px solid;
    }

    tr {
        height: 50px;
        border-bottom: 1px solid rgb(209, 205, 199);
    }

    tr:not(thead > tr):hover {
        background-color: #0b0d0e;
    }

    .footer {
        display: none;
    }
</style>

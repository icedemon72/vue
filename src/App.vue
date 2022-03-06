<template>
	<div id="nav">
		<ul>
			<li><router-link to="/">Home</router-link></li>
			<li><router-link to="/quiz">PLAY</router-link></li>
			<li class="float"><router-link to="/results">Results</router-link></li>
			<li class="float"><router-link to="/add">Add a question</router-link></li>
		</ul>
	</div>
	<router-view />
	<Footer />
</template>

<script>

import Footer from './components/Footer'

export default {
	name: 'App',
	components: {
		Footer
	}
}
</script>


<style scoped>
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		overflow: hidden;
		background-color: #333;
	}
	
	li {
		float: left;
	}
	
	li a {
		display: block;
		color: white;
		text-align: center;
		padding: 14px 16px;
		text-decoration: none;
		transition: ease-in 0.2s;
		-webkit-transition: ease-in 0.2s;
	}
	
	li a:hover {
		background-color: #111;
	}

	.float {
		float: right;
	}

	@media screen and (max-width: 400px) {
		li, .float {
			float: none;
		}
}
</style>

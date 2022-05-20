<script>
    let username;
    let password;
    let error;
    let current;
    let hide = true;

    function submit() {
        if(username === null) {
            error.innerHTML = "Error: You need to provide a username.";
            hide = false;
        }
    }
</script>


<svelte:head>
    <title>Project: Library Login</title>
</svelte:head>

<main>
    <section id="form">
        <form id="login" on:submit="{submit}">
            <h1>Login</h1>
            <p class:hide="{current === 'foo'}" id="error" bind:this={error}>Error: This is a test error</p>
            <input bind:value={username} type="text" placeholder="Username...">
            <input bind:value={password} type="password" placeholder="Password...">
            <input type="submit">
        </form> 
    </section>
    <section id="footer-left">
        <p id="copy">Project: Library v0.0.1 &copy 2022</p>
    </section>
</main>

<style>
    main {
        text-align: center;
    }

    #error {
        color: #f7cac9;
        margin: 1 1 1 1;
    }

    #form {
        width: 30%;
        margin: auto;
    }

    input[type="text"], input[type="password"] {
        border: none;
        width: 100%;
        border-radius: 2px;
        margin-bottom: 20px;
        padding: 2 2 2 2;
    }

    input[type="submit"] {
        background-color: #77DD77;
        border: none;
        border-radius: 2px;
        width: 50%;
    }

    input[type="submit"]:focus {
        background-color: #42ab49;
    }

    input:focus{
        outline: none;
    }

    h1 {
        color: #77DD77;
        font-size: 48px;
    }
    #footer-left {
        position: absolute;
        bottom: 0;
        width: 50%;
    }
    #copy {
        margin-bottom: 5px;
        float: left;
        color: #77DD77;
    }
</style>
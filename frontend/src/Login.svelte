<script>

    import { token } from './stores';

    let username;
    let password;
    let hasError = false;
    let errorText;

    async function submit(e) {
        // This prevents the page from reloading, causing a headache for debugging
        e.preventDefault();

        if(username === undefined) {
            errorText = "Error: You need to provide a username.";
            hasError = true;
            return;
        }

        if(password === undefined) {
            errorText = "Error: You need to provide a password.";
            hasError = true;
            return;
        }

        var dat = new Object();
        dat.email = username;
        dat.password = password;

        try {
            var req = await fetch(APIURL + "/api/v1/auth/admin/login/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dat) 
            });
        } catch(e) {
            errorText = "Error: Failed to connect to server.";
            hasError = true;
            return;
        }
        
        if(req.status === 404 || req.status === 403) {
            errorText = "Error: Invalid login.";
            hasError = true;
            return;
        }

        if(req.status === 200) {
            var res = await req.json();
            token.update(token => res.token);
            
            return;
        } else {
            errorText = "Error: Requested failed from server.";
            hasError = true;
            return;
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
            {#if hasError}
                <p id="error">{errorText}</p>
            {/if}
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
<script>
  import { goto } from "@sapper/app";

  let email = "";
  let password = "";
  let emailError = "";
  let passwordError = "";
</script>

<form
  on:submit={async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.errors) {
        emailError = data.errors.email;
        passwordError = data.errors.password;
      }

      if (data.user) {
        goto('/');
      }
    } catch (err) {
      console.error(err);
    }
    email = '';
    password = '';
  }}>
  <h2>Log In</h2>
  <label for="email">Email</label>
  <input type="text" id="email" bind:value={email} required />
  <div class="email error">{emailError}</div>

  <label for="password">Password</label>
  <input type="password" id="password" bind:value={password} required />
  <div class="password error">{passwordError}</div>

  <button>Log In</button>
</form>

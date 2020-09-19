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
      const res = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.redirected) return goto(res.url);
      const data = await res.json();

      if (data.errors) {
        emailError = data.errors.email;
        passwordError = data.errors.password;
      }
    } catch (err) {
      console.error(err);
    }
    email = '';
    password = '';
  }}>
  <h2>Sign up</h2>
  <label for="email">Email</label>
  <input type="text" id="email" bind:value={email} required />
  <div class="email error">{emailError}</div>

  <label for="password">Password</label>
  <input type="password" id="password" bind:value={password} required />
  <div class="password error">{passwordError}</div>

  <button>Sign up</button>
</form>

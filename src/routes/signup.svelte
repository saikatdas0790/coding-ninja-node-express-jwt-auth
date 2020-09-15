<script>
  let email = "";
  let password = "";
</script>

<form
  on:submit={(e) => {
    e.preventDefault();
    console.log(email, password);
  }}>
  <h2>Sign up</h2>
  <label for="email">Email</label>
  <input type="text" id="email" bind:value={email} required />
  <div class="email error" />

  <label for="password">Password</label>
  <input type="password" id="password" bind:value={password} required />
  <div class="password error" />

  <button>Sign up</button>
</form>

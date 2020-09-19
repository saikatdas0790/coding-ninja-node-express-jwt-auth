<script>
  import { stores, goto } from "@sapper/app";
  const { session } = stores();

  if (!$session.user || !$session.user.id) goto("/login");
</script>

<slot />

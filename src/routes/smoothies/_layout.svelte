<script>
  import { stores, goto } from "@sapper/app";
  const { session } = stores();

  console.log($session);

  if (!$session.user.id) goto("/login");
</script>

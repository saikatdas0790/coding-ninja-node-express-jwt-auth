<script>
  import { stores, goto } from "@sapper/app";
  const { session } = stores();

  if (!$session.user.id) goto("/login");
</script>

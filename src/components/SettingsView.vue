<template>
  <section class="view section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <h4 class="title is-4">Integrations</h4>
          <div class="tile is-ancestor">
            <div class="tile box is-child">
              <p class="title">
                Twilio
              </p>
              <p class="action">
                <button type="button" class="button is-primary">Connect</button>
              </p>
            </div>
            <div class="tile box is-child">
              <p class="title">
                SendGrid
              </p>
              <p class="action">
                <button type="button" class="button is-primary">Connect</button>
              </p>
            </div>
            <div class="tile box is-child">
              <p class="title">
                Jira
              </p>
              <p class="action">
                <button type="button" class="button is-primary">Connect</button>
              </p>
            </div>
            <div class="tile box is-child">
              <p class="title">
                Trello
              </p>
              <p class="action">
                <button type="button" class="button is-primary">Connect</button>
              </p>
            </div>
            <div class="tile box is-child">
              <p class="title">
                Slack
              </p>
              <p class="action">
                <button type="button" class="button is-primary">Connect</button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <h4 class="title is-4">Users</h4>          
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped>
.tile.is-ancestor {
  margin-left:0;
  margin-right:0;
}

.tile.is-child {
  margin:20px 20px 20px 0 !important;
}

.tile.tile.is-child:last-child {
  margin-right: 0 !important;
}

.tile .title {
  text-align: center;
}

.action {
  margin: 0 -1.25rem -1.25rem -1.25rem;
}

.action button {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  display: block;  
  width: 100%;
}
</style>

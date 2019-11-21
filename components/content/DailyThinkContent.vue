<template>
  <div class="home-content layout-content">
    <Row>
      <Col v-for="th in thinks" :xs="24" :sm="24" :md="12" :lg="8">
        <Card style="width:320px;height:300px" dis-hover >
          <div style="text-align:center">
            <h3>{{th.content}}</h3>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      thinks: state => state.dailyThink.thinks
    })
  },
  methods: {
    ...mapActions({
      getThinkDailyInfo: "dailyThink/GET_DAILY_THINK_INFO"
    })
  },
  beforeMount() {
    this.getThinkDailyInfo({ a: "b" }).then(res => {
      console.log(this.thinks);
    });
    console.log("...");
  }
};
</script>
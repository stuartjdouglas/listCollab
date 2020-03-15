var app = new Vue({
    el: '#app',
    data: {
        users: [

        ],
        date: Date.now()
    },
    methods: {
        onMessage(data) {
            this.date = data;
        }
    },
    mounted() {
        var HOST = location.origin.replace(/^http/, 'ws')
        var ws = new WebSocket(HOST);

        ws.onmessage = (event) => {
            this.onMessage(event.data);
        };
    }
})
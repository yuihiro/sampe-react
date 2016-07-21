class AppStore {

    constructor(props) {

        this.$app = null;

        this.admin_info = {
            id: "id",
            password: "password"
        };

        this.app_info = {
            root_url : "http://localhost:9090",
            window_width : 100,
            window_height : 100
        };
    }
}

export default new AppStore();
class App {
    loadingCount = 0;
    init = ({ showLoading, hideLoading }) => {
        this._showLoading = showLoading;
        this._hideLoading = hideLoading;
    };

    showLoading = () => {
        if(this.loadingCount <= 0) {
            this._showLoading();
            this.loadingCount = 0;
        }

        this.loadingCount++;
    };
    hideLoading = () => {
        this.loadingCount --;

        if(this.loadingCount <= 0){
            this._hideLoading();
            this.loadingCount = 0;
        }
    };
}
export default new App();
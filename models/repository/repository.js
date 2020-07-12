class RepositoryAbstract {

    /**
     * @param {Model} model
     */
    constructor(model) {
        this._model = model;
    }
    /**
     * @return {Model|Query}
     */
    getModel() {
        return this._model;
    }

    /**
     * @param {Object} params
     * @return {Model}
     */
    getNew(params) {
        const model = this.getModel();
        return new model(params);
    }
}

module.exports = RepositoryAbstract;
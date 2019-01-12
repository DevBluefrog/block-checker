'use strict';

export default (sequelize, DataTypes) => {
    var query = sequelize.define('query', {
        queryAddress: {
            type: DataTypes.STRING,
        },
        queryComment: {
            type: DataTypes.STRING,
        },
        queryContributor: {
            type: DataTypes.STRING,
        },
    }, {});
    query.associate = function(models) {

    };
    return query;
};
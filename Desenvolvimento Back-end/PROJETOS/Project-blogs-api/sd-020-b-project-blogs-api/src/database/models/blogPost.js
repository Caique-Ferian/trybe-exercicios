module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            foreignKey:true,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
    },
    {   timestamps: false,
        tableName: 'BlogPosts'
    });

    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User,
            {foreignKey: 'userId', as: 'user'});
    };

    return BlogPost;
};
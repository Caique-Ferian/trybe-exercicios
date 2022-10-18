db.produtos.updateMany(
    { nome: { $in: ["Big Mac", "Quarteirão com Queijo"] } },
    { $pull: { ingredientes: "cebola" } },
);
db.produtos.find({}, { _id: 0, nome: 1, ingredientes: 1 });
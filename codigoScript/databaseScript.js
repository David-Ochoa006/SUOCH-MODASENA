const { MongoClient } = require('mongodb');

async function main() {
    // Conectar con la base de datos MongoDB
    const uri = "mongodb://localhost:27017"; // Asegúrate de que MongoDB esté corriendo
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Conectado a la base de datos");

        // Seleccionar la base de datos y la colección
        const db = client.db('suoach_moda'); // Nombre de la base de datos
        const collection = db.collection('parque'); // Nombre de la colección

        // 1. Insertar documentos
        const documents = [
            { nombre: "Parque Central", ciudad: "Madrid", extension: 5000, abierto: true },
            { nombre: "Jardín Botánico", ciudad: "Barcelona", extension: 3000, abierto: false },
            { nombre: "Parque Nacional", ciudad: "Sevilla", extension: 8000, abierto: true },
            { nombre: "Parque Urbano", ciudad: "Valencia", extension: 4000, abierto: true },
            { nombre: "Parque Histórico", ciudad: "Bilbao", extension: 2000, abierto: false }
        ];
        await collection.insertMany(documents);
        console.log("Documentos insertados");

        // 2. Actualizar el primer y último documento
        await collection.updateOne({ nombre: "Parque Central" }, { $set: { abierto: false } });
        await collection.updateOne({ nombre: "Parque Histórico" }, { $set: { abierto: true } });
        console.log("Documentos actualizados");

        // 3. Listar la colección completa
        const allDocuments = await collection.find().toArray();
        console.log("Colección completa:");
        console.log(allDocuments);

        // 4. Borrar el tercer documento
        await collection.deleteOne({ nombre: "Parque Nacional" });
        console.log("Tercer documento borrado");

        // 5. Listar la colección de nuevo
        const remainingDocuments = await collection.find().toArray();
        console.log("Colección después de borrar el tercer documento:");
        console.log(remainingDocuments);

    } finally {
        // Cerrar la conexión con la base de datos
        await client.close();
    }
}

main().catch(console.error);

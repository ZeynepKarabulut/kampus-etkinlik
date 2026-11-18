import mongoose from "mongoose";

const dbURI = process.env.MONGODB_URI || "mongodb://localhost/kampus";

mongoose.connect(dbURI);

mongoose.connection.on("connected", () => {
  console.log("Mongoose " + dbURI + " adresindeki veritabanına bağlandı\n");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose bağlantı hatası:\n" + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose bağlantısı kesildi\n");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Bağlantı kapatıldı ve uygulama sonlandırıldı");
  process.exit(0);
});
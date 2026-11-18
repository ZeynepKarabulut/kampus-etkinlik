import("./config/db.js"); // veya dosya yoluna göre require('./db') veya require('./data/db')
import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API çalışıyor: http://localhost:${PORT}`);
});
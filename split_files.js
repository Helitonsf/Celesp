const fs = require('fs');

function splitProject() {
  const html = fs.readFileSync('index.html', 'utf-8');
  
  const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  const jsMatch = html.match(/<script>\s*(\(function\(\)\{[\s\S]*?\}\)\(\);)\s*<\/script>/);

  if (cssMatch && jsMatch) {
    if (!fs.existsSync('css')) fs.mkdirSync('css');
    if (!fs.existsSync('js')) fs.mkdirSync('js');

    fs.writeFileSync('css/style.css', cssMatch[1].trim(), 'utf-8');
    fs.writeFileSync('js/app.js', jsMatch[1].trim(), 'utf-8');

    let newHtml = html.replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="css/style.css">');
    newHtml = newHtml.replace(/<script>[\s\S]*?<\/script>/, '<script src="js/app.js"></script>');

    fs.writeFileSync('index.html', newHtml, 'utf-8');
    console.log("Arquivos divididos com sucesso!");
  } else {
    console.error("Erro: Não foi possível encontrar as tags style e script.");
  }
}

splitProject();

const fs = require('fs');

let content = fs.readFileSync('js/app.js', 'utf8');

const regex = /document\.getElementById\("conc-totals"\)\.innerHTML\s*=\s*[\s\S]*?renderConciliacao\(extrato\);/m;

const newTotals = `
        var soNoBanco = extrato.length - matchCount;
        var soNoSistema = sistema.length - matchCount;
        var pendencias = soNoBanco + soNoSistema;
        var total = matchCount + soNoBanco + soNoSistema;
        var percConciliado = total === 0 ? 0 : Math.round((matchCount / total) * 100);
        
        var pctMatch = total === 0 ? 0 : (matchCount / total) * 100;
        var pctBanco = total === 0 ? 0 : (soNoBanco / total) * 100;
        var pctSistema = total === 0 ? 0 : (soNoSistema / total) * 100;

        document.getElementById("conc-totals").innerHTML = 
           "<div style='width:100%'>" +
           "  <div style='display:flex; justify-content:space-between; align-items:baseline; margin-bottom: 8px;'>" +
           "    <h3 style='margin:0; font-size:18px; color:var(--text);'>" + pendencias + " pendências, " + percConciliado + "% conciliado</h3>" +
           "  </div>" +
           "  <div class='progress-container'>" +
           "    <div class='progress-segment' style='width:" + pctMatch + "%; background:var(--status-green-txt);'></div>" +
           "    <div class='progress-segment' style='width:" + pctBanco + "%; background:var(--status-red-txt);'></div>" +
           "    <div class='progress-segment' style='width:" + pctSistema + "%; background:var(--status-yellow-txt);'></div>" +
           "  </div>" +
           "  <div class='progress-legend'>" +
           "    <span><span style='color:var(--status-green-txt);'>●</span> Conciliado " + matchCount + "</span>" +
           "    <span><span style='color:var(--status-red-txt);'>●</span> Só no banco " + soNoBanco + "</span>" +
           "    <span><span style='color:var(--status-yellow-txt);'>●</span> Só no sistema " + soNoSistema + "</span>" +
           "  </div>" +
           "</div>";
           
        // renderConciliacao(extrato); (se existisse)
`;

content = content.replace(regex, newTotals);
fs.writeFileSync('js/app.js', content);

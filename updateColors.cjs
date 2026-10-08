const fs = require('fs');
const path = require('path');

const cssFile = path.join(__dirname, 'src/index.css');
const appFile = path.join(__dirname, 'src/App.tsx');

let css = fs.readFileSync(cssFile, 'utf8');
let app = fs.readFileSync(appFile, 'utf8');

// The new palette based on the Nisa logo
const tokens = `
  /* Nisa brand colors */
  --nisa-red:       #CA1221;
  --nisa-red-dark:  #A10B18;
  --nisa-red-pale:  #FDF2F3;
  --nisa-gold:      #F1A104;
  --nisa-gold-dark: #C98503;
  --nisa-gold-pale: #FDF9F0;
  --nisa-surface:   #FBF9F9;
  --nisa-border:    #EBE0E0;
  --nisa-text:      #2D2323;
  --nisa-muted:     #756B6B;
`;

// 1. Replace the color tokens block in CSS
css = css.replace(/\/\* Nisa brand colors \*\/[\s\S]*?--nisa-muted:[^;]+;/, tokens.trim());

// 2. Replace all `--nisa-blue` variables with `--nisa-red` in the CSS
css = css.replace(/var\(--nisa-blue\)/g, 'var(--nisa-red)');
css = css.replace(/var\(--nisa-blue-dark\)/g, 'var(--nisa-red-dark)');
css = css.replace(/var\(--nisa-blue-pale\)/g, 'var(--nisa-red-pale)');

// 3. Replace all `--nisa-cyan` with `--nisa-gold`
css = css.replace(/var\(--nisa-cyan\)/g, 'var(--nisa-gold)');

// 4. Update utility classes in CSS (e.g. .blue -> .red)
css = css.replace(/\.department-icon\.blue/g, '.department-icon.red');
css = css.replace(/\.department-icon\.cyan/g, '.department-icon.gold');
css = css.replace(/\.women-card-icon\.red/g, '.women-card-icon.red'); // already red
css = css.replace(/\.doctor-photo-badge\.cyan/g, '.doctor-photo-badge.gold');
css = css.replace(/\.contact-icon\.blue/g, '.contact-icon.red');
css = css.replace(/h4\.blue/g, 'h4.red');

// Clean up selection colors and shadows that were blue
css = css.replace(/rgba\(18,59,143,/g, 'rgba(202,18,33,'); // rgba equivalent of #CA1221 is 202, 18, 33

// Update specific hardcoded gradient in care-band
css = css.replace(/linear-gradient\(135deg,var\(--nisa-blue\) 0%,var\(--nisa-blue-dark\) 100%\)/g, 'linear-gradient(135deg,var(--nisa-red) 0%,var(--nisa-red-dark) 100%)');

// Update App.tsx classes
app = app.replace(/'blue'/g, "'red'");
app = app.replace(/'cyan'/g, "'gold'");
app = app.replace(/className="blue"/g, 'className="red"');
app = app.replace(/className="contact-icon blue"/g, 'className="contact-icon red"');

// Fix `badgeClasses = ['', 'red', 'cyan', 'gold']`
app = app.replace(/badgeClasses = \['', 'red', 'cyan', 'gold'\]/g, "badgeClasses = ['', 'red', 'gold', 'gold']");

// Update App.tsx inline styles referring to blue
app = app.replace(/var\(--nisa-blue-dark\)/g, 'var(--nisa-red-dark)');
app = app.replace(/var\(--nisa-blue\)/g, 'var(--nisa-red)');
app = app.replace(/var\(--nisa-blue-pale\)/g, 'var(--nisa-red-pale)');
app = app.replace(/var\(--nisa-cyan\)/g, 'var(--nisa-gold)');


fs.writeFileSync(cssFile, css, 'utf8');
fs.writeFileSync(appFile, app, 'utf8');

console.log('Colors updated successfully.');

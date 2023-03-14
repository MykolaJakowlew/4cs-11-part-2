const fs = require('fs');

const text = "Sint labore fugiat commodo excepteur. Laboris tempor et excepteur excepteur laboris commodo non deserunt dolore. Dolor fugiat ea Lorem esse. Minim ullamco exercitation minim fugiat officia velit mollit consequat est eu nulla. Ut est fugiat dolor occaecat laborum nostrud proident exercitation proident culpa.";


console.log(1);
fs.writeFileSync('./text_sync.txt', text);
console.log(2);
fs.writeFile('./text_async.txt', text, (err, data) => {
  console.log(3);
  if (err) {
    console.error(err);
    return;
  }

  console.log('data:', data);
});
console.log(4);

const row2 = "Veniam ad labore eiusmod cillum ullamco reprehenderit enim enim duis eu officia eu duis sint. Proident esse sint anim cupidatat labore tempor et minim nisi culpa. Cupidatat velit esse non aute elit commodo ex. Pariatur nisi adipisicing ullamco est voluptate et ea ad qui incididunt consequat consectetur consectetur. Dolor sint in eiusmod quis aliqua eiusmod consectetur do nostrud deserunt do. Nisi aute do est sint dolor consectetur est. Consectetur irure esse duis irure aliqua anim.";


fs.writeFileSync('./text_2.txt', `    ${text}\n    ${row2}`);

const a = 56;
const b = [67, 56];
const c = { f: 45, g: { h: 67 } };
const d = [{ f: 45, g: { h: 67 } }];

fs.writeFileSync('./text_variables.txt', `${a}\n${b}\n`);
fs.appendFileSync('./text_variables.txt', `${JSON.stringify(c)}\n${JSON.stringify(d)}`);

let copy_a, copy_b, copy_c, copy_d;

// sync action
{
  const result = fs.readFileSync('./text_variables.txt');
  console.log(result);
  const result_text = result.toString();
  console.log(result_text);
  [copy_a, copy_b, copy_c, copy_d] = result_text.split('\n');
  copy_a = parseInt(copy_a);
  copy_b = copy_b.split(',').map(el => parseInt(el));
  copy_c = JSON.parse(copy_c);
  copy_d = JSON.parse(copy_d);
  console.log(`copy_a:${copy_a}`);
  console.log(`copy_b:${copy_b}`);
  console.log(`copy_c:`, copy_c);
  console.log(`copy_d:`, copy_d);
}

{
  fs.readFile('./text_variables.txt', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const result_text = data.toString();
    console.log(result_text);
    [copy_a, copy_b, copy_c, copy_d] = result_text.split('\n');
    copy_a = parseInt(copy_a);
    copy_b = copy_b.split(',').map(el => parseInt(el));
    copy_c = JSON.parse(copy_c);
    copy_d = JSON.parse(copy_d);
    console.log(`copy_a:${copy_a}`);
    console.log(`copy_b:${copy_b}`);
    console.log(`copy_c:`, copy_c);
    console.log(`copy_d:`, copy_d);
  });
}

const func = async () => {
  const result = await new Promise((resolve, reject) => {
    fs.readFile('./text_variables.txt', (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data.toString());
    });
  });
  [copy_a, copy_b, copy_c, copy_d] = result.split('\n');
  copy_a = parseInt(copy_a);
  copy_b = copy_b.split(',').map(el => parseInt(el));
  copy_c = JSON.parse(copy_c);
  copy_d = JSON.parse(copy_d);
  console.log(`copy_a:${copy_a}`);
  console.log(`copy_b:${copy_b}`);
  console.log(`copy_c:`, copy_c);
  console.log(`copy_d:`, copy_d);
};

func();
# angular2-collapsible

## Installation

Prerequisites:

* @angular/animations
    ```bash
    $ npm install @angular/animations --save
    ```
* materialize-css
    ```bash
    $ npm install materialize-css --save
    ```
    open src/styles.css and add this line:
    ```bash
    @import '~materialize-css/dist/css/materialize.min.css';
    ```


To install this library, run:

```bash
$ npm install angular2-collapsible --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install angular2-collapsible
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { CollapsibleModule } from 'angular2-collapsible';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // Specify your library as an import
    CollapsibleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application:

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>

<collapsible-list [type]="'accordion'">
  
  <collapsible-list-item>
    <collapsible-header class="waves-effect">
      Item #1
    </collapsible-header>
    <collapsible-body [expanded]="false">
      <p>Item #1 Body</p>
    </collapsible-body>
  </collapsible-list-item>

  <collapsible-list-item>
    <collapsible-header class="waves-effect">
      Item #2
    </collapsible-header>
    <collapsible-body [expanded]="true">
      <p>Item #2 Body</p>
    </collapsible-body>
  </collapsible-list-item>

</collapsible-list>
```

OR for a table with collapsible rows

```xml
<!-- You can now use your library component in app.component.html -->
<h1>
  {{title}}
</h1>

<collapsible-table [type]="'accordion'" bordered>

  <thead>
    <collapsible-table-row>
      <th>Col #1</th>
      <th>Col #2</th>
      <th>Col #3</th>
    </collapsible-table-row>
  </thead>

  <tbody>
    <collapsible-table-row [detail]="detail1">
      <td>Cell(0,0)</td>
      <td>Cell(0,1)</td>
      <td>Cell(0,2)</td>
    </collapsible-table-row>
    <collapsible-table-row-detail #detail1>
      <table>
        <tr>
          <td width="75%">Row #1 Detail #1</td>
          <td>Row #1 Detail #2</td>
        </tr>
      </table>
    </collapsible-table-row-detail>

    <collapsible-table-row [detail]="detail2">
      <td>Cell(1,0)</td>
      <td>Cell(1,1)</td>
      <td>Cell(1,2)</td>
    </collapsible-table-row>
    <collapsible-table-row-detail #detail2>
      <p>Row #2 Detail</p>
    </collapsible-table-row-detail>

  </tbody>

</collapsible-table>
```

## Development

To generate all `*.js`, `*.js.map` and `*.d.ts` files:

```bash
$ npm run tsc
```

To lint all `*.ts` files:

```bash
$ npm run lint
```

## License

MIT © [Dmitrii Serikov](mailto:dmitrii.serikov@gmail.com)

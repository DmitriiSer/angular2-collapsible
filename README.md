# angular-collapsible

An Angular 4 Materialize CSS collapsible components.

## [Demo](https://dmitriiser.github.io/angular2-collapsible-example/)

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

## Consuming the library

You can import the library in any Angular application by running:

```bash
$ npm install angular2-collapsible
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // <-- import required BrowserAnimationsModule
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { CollapsibleModule } from 'angular2-collapsible'; // <-- import the module

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,  // <-- include required BrowserAnimationsModule
    CollapsibleModule // <-- include angular2-collapsible module
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once the library is imported, you can use its components and services in your Angular application:

```xml
<h1>{{title}}</h1>

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

OR for a table with collapsible row details

```xml
<h1>{{title}}</h1>

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

## Options

| Option                   | Type                                | Default value   | Description                                                   |
| ------------------------ | ----------------------------------- | --------------- | ------------------------------------------------------------- |
| **type**                 | { 'accordion' &#124; 'expandable' } | *'accordion'*   | The type of the collapsible list: 'accordion' or 'expandable' |

### Collapsible list options

### Collapsible table options

| Option                      | Type    | Default value              | Description                                                      |
| --------------------------- | ------- | -------------------------- | ---------------------------------------------------------------- |
| **bordered**                | boolean | *false*                    | Makes the table bordered                                         |
| **borderedHorizontally**    | boolean | *false*                    | Makes the table bordered horizontally only                       |
| **borderedVertically**      | boolean | *false*                    | Makes the table bordered vertically only                         |
| **striped**                 | boolean | *false*                    | Makes the table striped                                          |
| **stripedOddColor**         | string  | *'rgba(242,242,242,0.8)'*  | A color of an odd striped row                                    |
| **stripedOddTextColor**     | string  | *'black'*                  | A text color of an odd striped row                               |
| **stripedEvenColor**        | string  | *'transparent'*            | A color of an even striped row                                   |
| **stripedEvenTextColor**    | string  | *'black'*                  | A text color of an even striped row                              |
| **highlight**               | boolean | *false*                    | Highlight table rows on mouse hover                              |
| **highlightColor**          | string  | *'rgba(222,222,222, 0.8)'* | A color of a highlighted row                                     |
| **highlightTextColor**      | string  | *'black'*                  | A text color of a highlighted row                                |
| **activeColor**             | string  | *'rgba(212,212,212, 0.8)'* | A color of an active row                                         |
| **activeTextColor**         | string  | *'black'*                  | A text color of an active row                                    |
| **centered**                | boolean | *false*                    | Center align all the text in the table                           |
| *[ ] TODO: responsive*      | boolean | *false*                    | Makes the table horizontally scrollable on smaller screen widths |
| **select**                  | boolean | *false*                    | Allows to select rows                                            |
| **selectMultipleRows**      | boolean | *false*                    | Allows to multiple rows                                          |
| **selectColor**             | string  | *'rgba(212,212,212, 0.8)'* | Allows to multiple rows                                          |
| **selectTextColor**         | string  | *'black'*                  | A text color of a selected row                                   |
| **allowDeselectingRows**    | boolean | *false*                    | Allows deselecting selected rows                                 |
| **allowKeyboardNavigation** | boolean | *true*                     | Allows navigation between table rows using arrow keys            |
| **noTextSelect**            | boolean | *false*                    | Disables user select withing the table                           |

## License

MIT © [Dmitrii Serikov](mailto:dmitrii.serikov@gmail.com)

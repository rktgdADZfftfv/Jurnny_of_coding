import './app.css';
import secretmessage, { age, user } from './data';
function App() {
  return (
    <div className="card">
     <table border={1}>
      <th>Data impot test</th>
      <th>Name: {user}</th>
      <th>Age: {age}</th>
      <th>secret: {secretmessage}</th>
      <tr>
        <td className='Name'></td>
        <td className='Name'>Rahul</td>
        <td className='Name'>22</td>
        <td className='Name'>Badal</td>
      </tr>
      <tr>
        <td></td>
        <td>Raj</td>
        <td>12</td>
        <td>nishenat</td>
      </tr>
      <tr>
        <td></td>
        <td>Bahu</td>
        <td>23</td>
        <td>monu</td>
      </tr>
      <tr>
        <td className='Name'></td>
        <td className='Name'>Rahul</td>
        <td className='Name'>22</td>
        <td className='Name'>Badal</td>
      </tr>
      <tr>
        <td></td>
        <td>Raj</td>
        <td>12</td>
        <td>nishenat</td>
      </tr>
      <tr>
        <td></td>
        <td>Bahu</td>
        <td>23</td>
        <td>monu</td>
      </tr>
      <tr>
        <td className='Name'></td>
        <td className='Name'>Rahul</td>
        <td className='Name'>22</td>
        <td className='Name'>Badal</td>
      </tr>
      <tr>
        <td></td>
        <td>Raj</td>
        <td>12</td>
        <td>nishenat</td>
      </tr>
      <tr>
        <td></td>
        <td>Bahu</td>
        <td>23</td>
        <td>monu</td>
      </tr>


     </table>
    </div>
  );
}

export default App;
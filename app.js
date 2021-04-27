// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START gae_node_request_example]


const express = require('express')
const mongoose = require('mongoose')
//const url = "mongodb://localhost:27017/coexcldb";
const app = express();
app.use(express.json());
const url = "mongodb+srv://coexcl:coexcl@cluster0.9nvpj.mongodb.net/coexcldb";


mongoose.connect(url, {useNewUrlParser:true,useUnifiedTopology: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});

const userRouter = require('./routes/aliens')
app.use('/users',userRouter)


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});


module.exports = app;

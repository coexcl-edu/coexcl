// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// [START gae_node_request_example]


const express = require('express')
const mongoose = require('mongoose')
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

const userRouter = require('./routes/userRoute')
app.use('/users',userRouter)

const uploadRouter = require('./routes/uploadRoute')
app.use('/documents',uploadRouter)

const videoRouter = require('./routes/videoRoute')
app.use('/videos',videoRouter)

const loginRouter = require('./routes/loginRoute')
app.use('/login',loginRouter)

const noteRouter = require('./routes/noteRoute')
app.use('/notes',noteRouter)

const quizRouter = require('./routes/quizRoute')
app.use('/quiz',quizRouter)

const schoolRouter = require('./routes/schoolRoute')
app.use('/school',schoolRouter)

const noticeRouter = require('./routes/noticeRoute')
app.use('/notice',noticeRouter)

const liveClassRouter = require('./routes/liveClassRoute')
app.use('/liveclass',liveClassRouter)

const funFactRouter = require('./routes/funFactRoute')
app.use('/funfacts',funFactRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});


module.exports = app;

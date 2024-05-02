import express from 'express';
import db from './db/conn.js';
import { ObjectId } from 'mongodb';

const PORT = 5050;
const app = express();

app.use(express.json());

//Indexes
const createIndexes = async () => {
  try {
    await db.collection('grades').createIndex({ class_id: 1 });

    await db.collection('grades').createIndex({ learner_id: 1 });

    await db.collection('grades').createIndex({ learner_id: 1, class_id: 1 });

    console.log('Indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
};

//Validation
db.collection('grades', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['class_id', 'learner_id'],
      properties: {
        class_id: {
          bsonType: 'int',
          minimum: 0,
          maximum: 300,
          description: 'class_id must be an integer between 0 and 300'
        },
        learner_id: {
          bsonType: 'int',
          minimum: 0,
          description: 'learner_id must be an integer greater than or equal to 0'
        }
      }
    }
  },
  validationAction: 'warn'
});
// The schema
const learnerSchema = {
  // Use the $jsonSchema operator
  $jsonSchema: {
    bsonType: 'object',
    title: 'Learner Validation',
    // List required fields
    required: ['name', 'enrolled', 'year', 'campus'],
    // Properties object contains document fields
    properties: {
      name: {
        // Each document field is given validation criteria
        bsonType: 'string',
        // and a description that is shown when a document fails validation
        description: "'name' is required, and must be a string"
      },
      enrolled: {
        bsonType: 'bool',
        description: "'enrolled' status is required and must be a boolean"
      },
      year: {
        bsonType: 'int',
        minimum: 1995,
        description: "'year' is required and must be an integer greater than 1995"
      },
      avg: {
        bsonType: 'double',
        description: "'avg' must be a double"
      },
      campus: {
        enum: ['Remote', 'Boston', 'New York', 'Denver', 'Los Angeles', 'Seattle', 'Dallas'],
        description: 'Invalid campus location'
      }
    }
  }
};

// Find invalid documents.
app.get('/', async (req, res) => {
  let collection = await db.collection('learners');
  let result = await collection.find({ $nor: [learnerSchema] }).toArray();
  res.send(result).status(204);
});

app.get('/grades/stats', async (req, res) => {
  let collection = await db.collection('grades');
  let classId = req.params.id;
  let result = await collection
    .aggregate([
      {
        $unwind: {
          path: '$scores'
        }
      },
      {
        $group: {
          _id: '$student_id',
          quiz: {
            $push: {
              $cond: {
                'if': {
                  $eq: ['$scores.type', 'quiz']
                },
                then: '$scores.score',
                'else': '$$REMOVE'
              }
            }
          },
          exam: {
            $push: {
              $cond: {
                'if': {
                  $eq: ['$scores.type', 'exam']
                },
                then: '$scores.score',
                'else': '$$REMOVE'
              }
            }
          },
          homework: {
            $push: {
              $cond: {
                'if': {
                  $eq: ['$scores.type', 'homework']
                },
                then: '$scores.score',
                'else': '$$REMOVE'
              }
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          class_id: '$_id',
          avg: {
            $sum: [
              {
                $multiply: [
                  {
                    $avg: '$exam'
                  },
                  0.5
                ]
              },
              {
                $multiply: [{ $avg: '$quiz' }, 0.3]
              },
              {
                $multiply: [{ $avg: '$homework' }, 0.2]
              }
            ]
          }
        }
      },
      {
        $group: {
          _id: null,
          class_id: {
            $push: '$class_id'
          },
          totalStudents: {
            $sum: 1
          },
          above60Students: {
            $sum: {
              $cond: {
                'if': { $gt: ['$avg', 60] },
                then: 1,
                'else': 0
              }
            }
          }
        }
      },
      {
        $project: {
          totalStudents: '$totalStudents',
          above60Students: '$above60Students',
          ratio: {
            $divide: ['$above60Students', '$totalStudents']
          }
        }
      }
    ])
    .toArray();
  res.send(result);
});

app.get('/grades/stats/:id', async (req, res) => {
  let collection = await db.collection('grades');
  let result = await collection
    .aggregate([
      {
        '$match': {
          'class_id': Number(req.params.id)
        }
      },
      {
        '$unwind': {
          'path': '$scores'
        }
      },
      {
        '$group': {
          '_id': '$student_id',
          'quiz': {
            '$push': {
              '$cond': {
                'if': {
                  '$eq': ['$scores.type', 'quiz']
                },
                'then': '$scores.score',
                'else': '$$REMOVE'
              }
            }
          },
          'exam': {
            '$push': {
              '$cond': {
                'if': {
                  '$eq': ['$scores.type', 'exam']
                },
                'then': '$scores.score',
                'else': '$$REMOVE'
              }
            }
          },
          'homework': {
            '$push': {
              '$cond': {
                'if': {
                  '$eq': ['$scores.type', 'homework']
                },
                'then': '$scores.score',
                'else': '$$REMOVE'
              }
            }
          }
        }
      },
      {
        '$project': {
          '_id': 0,
          'class_id': '$_id',
          'avg': {
            '$sum': [
              {
                '$multiply': [
                  {
                    '$avg': '$exam'
                  },
                  0.5
                ]
              },
              {
                '$multiply': [
                  {
                    '$avg': '$quiz'
                  },
                  0.3
                ]
              },
              {
                '$multiply': [
                  {
                    '$avg': '$homework'
                  },
                  0.2
                ]
              }
            ]
          }
        }
      },
      {
        '$group': {
          '_id': null,
          'class_id': {
            '$push': '$class_id'
          },
          'totalStudents': {
            '$sum': 1
          },
          'above60Students': {
            '$sum': {
              '$cond': {
                'if': { '$gt': ['$avg', 60] },
                'then': 1,
                'else': 0
              }
            }
          }
        }
      },
      {
        '$project': {
          'ratio': {
            '$divide': ['$above60Students', '$totalStudents']
          }
        }
      }
    ])
    .toArray();
  //  console.log(result)
  res.send(result);
});

app.get('/grades', async (req, res, next) => {
  let collection = await db.collection('grades');
  let totalStudents = await collection
    .aggregate([
      {
        $count: 'totalStudents'
      }
    ])
    .toArray();
  let learnersAbove70 = await collection
    .aggregate([
      {
        $project: {
          _id: 0,
          student_id: 1,
          avg: { $avg: '$scores.score' }
        }
      },
      {
        $match: {
          avg: { $gt: 70 }
        }
      },
      { $count: 'numOfLearners' }
    ])
    .toArray();
  let result = totalStudents[0].totalStudents / learnersAbove70[0].numOfLearners;
  res.send({
    totalLearners: totalStudents[0].totalStudents,
    learnersAvgAbove70: learnersAbove70[0].numOfLearners,
    ratioOfStudentsAbove70: result
  });
});

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send('Seems like we messed up somewhere...');
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import React, {useState, useEffect} from 'react'
import firebase from 'firebase/compat/app'



interface Props {
  firebaseApp: firebase.app.App;
}
interface User{
  id: string;
}
export const Upload: React.FC<Props> = ({firebaseApp}) => {
  const [data, setData] = useState<User[]>([]);

  const getUserCollection = async () => {
    const db = firebaseApp.firestore();
    const usersCollection = db.collection('users');
    const usersSnapshot = await usersCollection.get();
    return usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUserCollection()
      setData(users)
    }
    fetchData();
  }, []);
  console.log(data)
  // const db = getFirestore(firebaseApp);
  // const [value, loading, error] = useCollection(
  //   collection(getFirestore(firebaseApp), 'users'),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   });
  // console.log(value)
  // console.log(loading)
  // console.log(error)
  return (
    <div>
      <h1></h1>
      <h1>Upload ThetaTok</h1>
    </div>
  )
}

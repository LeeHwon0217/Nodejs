//4.30
import {
  createUser,
  deleteUser,
  getUsers,
  updateUserEmail,
} from "./userRepository.mjs";
import { db } from "./db.mjs";

async function main() {
  //   select
  //   const users = await getUsers();
  //   console.log("사용자 목록: ", users);
  //   insert
  // userid, userpw, name, hp, email, gender, ssn1, ssn2, zipcode, address1, address2, address3
  /*
    const newUserId = await createUser(  
    "hubo0217",
    "03250217",
    "이훤",
    "010-7734-4653",
    "hubo0217@naver.com",
    "남자",
    "980217",
    "1111111",
    "50456",
    "서울 강동구 강동",
    "강동대로 217",
    "3층"
  );
  console.log("새 사용자 ID: ", newUserId);
  */
  // update
  /*
  const updateCount = await updateUserEmail(1, "apple@naver.com");
  console.log("수정된 사용자 수: ", updateCount);


  */

  // delete
  const deletedCount = await deleteUser(10); // 삭제 안되는 경우는 참조가 되엉있는 것,
  console.log("삭제된 사용자 수: ", deletedCount);

  await db.end(); // 풀 종료(보통 사용하지 않음)
}

main();

import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { User } from "../../Model/Account/User";

/*
  Sayfa yenilendiğinde Redux sıfırlanır.

  Bu yüzden daha önce giriş yapan kullanıcı varsa
  localStorage içerisinden kullanıcıyı tekrar alıyoruz.
*/
const getStoredUser = (): User | null => {
  const storedUser =
    localStorage.getItem("user");

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as User;
  } catch {
    /*
      Kayıt bozuksa temizliyoruz.
    */
    localStorage.removeItem("user");

    return null;
  }
};

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: getStoredUser(),
};

export const accountSlice = createSlice({
  name: "account",

  initialState,

  reducers: {
    /*
      Login veya register başarılı olduğunda çalışır.
    */
    setUser: (
      state,
      action: PayloadAction<User>
    ) => {
      /*
        Kullanıcıyı Redux içerisine kaydet.
      */
      state.user = action.payload;

      /*
        Sayfa yenilendiğinde kullanıcı kaybolmasın diye
        localStorage içerisine de kaydet.
      */
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
      );
    },

    /*
      Kullanıcı çıkış yaptığında çalışır.
    */
    logout: (state) => {
      /*
        Redux içerisindeki kullanıcıyı temizle.
      */
      state.user = null;

      /*
        Tarayıcıdaki kullanıcı bilgisini temizle.
      */
      localStorage.removeItem("user");
    },
  },
});

export const {
  setUser,
  logout,
} = accountSlice.actions;

export default accountSlice.reducer;
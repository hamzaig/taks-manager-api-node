const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOne, setupDatabase, userOneId } = require("./fixtures/db");

beforeEach(setupDatabase);

test("Should signup new user", async () => {
  const response = await request(app).post("/users").send({
    name: "hamza",
    email: "hamzaig1@yahoo.com",
    password: "Mahmoodk1",
  }).expect(201)

  const user = await User.findOne({ _id: response.body.user._id });
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: "hamza",
      email: "hamzaig1@yahoo.com"
    },
    token: user.tokens[0].token
  })

  expect(user.password).not.toBe("Mahmoodk1");
})

test("Should login existing user", async () => {
  const response = await request(app).post("/users/login").send({
    email: userOne.email,
    password: userOne.password
  }).expect(200);
  const user = await User.findOne({ _id: response.body.user._id });
  expect(response.body.token).toBe(user.tokens[1].token);
})

test("Login Failure", async () => {
  await request(app).post("/users/login").send({
    email: "notauser@example.com",
    password: "wrongpassword"
  }).expect(400);
})

test("Should get profile user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test("Should not get profile without Authorization token", async () => {
  await request(app)
    .get("/users/me")
    .send()
    .expect(401);
})

test("should delete account with Authorization token", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
  const user = await User.findById(userOneId);
  expect(user).toBeNull();

})

test("should not delete account without Authorization token", async () => {
  await request(app)
    .delete("/users/me")
    .send()
    .expect(401)
})

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "test/fixtures/me.png")
    .expect(200)

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
})


test("Should update valid user Fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "Aahil Seemab"
    })
    .expect(200)

  const user = await User.findById(userOneId);
  expect("Aahil Seemab").toBe(user.name)
})

test("Shouldnot update invalid user Fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: "Lahore"
    })
    .expect(400);
})



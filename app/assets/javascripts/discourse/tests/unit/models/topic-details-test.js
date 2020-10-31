import { test, module } from "qunit";
import User from "discourse/models/user";
import Topic from "discourse/models/topic";

function buildDetails(id) {
  const topic = Topic.create({ id: id });
  return topic.get("details");
}

module("Unit | Model | TopicDetails", function () {
  test("defaults", function (assert) {
    var details = buildDetails(1234);
    assert.present(details, "the details are present by default");
    assert.ok(!details.get("loaded"), "details are not loaded by default");
  });

  test("updateFromJson", function (assert) {
    var details = buildDetails(1234);

    details.updateFromJson({
      allowed_users: [{ username: "eviltrout" }],
    });

    assert.equal(
      details.get("allowed_users.length"),
      1,
      "it loaded the allowed users"
    );
    assert.containsInstance(details.get("allowed_users"), User);
  });
});

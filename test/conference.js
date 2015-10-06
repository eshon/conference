contract('Conference', function(accounts) {
  it("should assert true", function(done) {
    var example = Conference.at(Conference.deployed_address);
    assert.isTrue(true);
    done();
  });
});

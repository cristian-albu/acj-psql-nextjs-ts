import Model from "../model";

jest.mock("../../client", () => ({
        connect: jest.fn().mockImplementation(() => ({
                query: jest.fn(),
                release: jest.fn(),
        })),
}));

describe("builds queries as expected", () => {
        it("selectAll query", () => {
                const queryDbSpy = jest.spyOn(Model.prototype, "queryDbRead");
                const TestModel = new Model();
                const query = "SELECT * FROM my_table;";

                TestModel.getList("my_table");
                expect(queryDbSpy).toHaveBeenCalledWith(query);
        });

        it("selectOne query", () => {
                const queryDbSpy = jest.spyOn(Model.prototype, "queryDbRead");
                const TestModel = new Model();
                const query = "SELECT * FROM my_table WHERE my_table_id=$1;";

                TestModel.getSingle("my_table", "my_table_id", 1);
                expect(queryDbSpy).toHaveBeenCalledWith(query, [1]);
        });

        it("insertOne query", () => {
                const queryDbSpy = jest.spyOn(Model.prototype, "queryDb");
                const TestModel = new Model();
                const query = `INSERT INTO my_table(id, name) VALUES($1, $2) RETURNING *;`;

                TestModel.createSingle("my_table", { id: "some_id", name: "some_name" });
                expect(queryDbSpy).toHaveBeenCalledWith(query, ["some_id", "some_name"]);
        });

        it("updateOne query", () => {
                const queryDbSpy = jest.spyOn(Model.prototype, "queryDb");
                const TestModel = new Model();
                const query = `UPDATE my_table SET name=$1, description=$2 WHERE some_id=$3 RETURNING *;`;

                TestModel.updateSingle("my_table", "some_id", 1, {
                        name: "some_name",
                        description: "some_description",
                });
                expect(queryDbSpy).toHaveBeenCalledWith(query, ["some_name", "some_description", 1]);
        });

        it("deleteOne query", () => {
                const queryDbSpy = jest.spyOn(Model.prototype, "queryDb");
                const TestModel = new Model();
                const query = "DELETE FROM my_table WHERE my_table_id=$1 RETURNING *;";

                TestModel.deleteSingle("my_table", "my_table_id", 1);
                expect(queryDbSpy).toHaveBeenCalledWith(query, [1]);
        });
});

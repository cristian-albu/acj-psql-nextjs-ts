import MetaUsers from "../analytics/meta_users";

jest.mock("../../client", () => ({
        connect: jest.fn().mockImplementation(() => ({
                query: jest.fn().mockImplementation(() => ({ rows: [1] })),
                release: jest.fn(),
        })),
}));

describe("meta_users", () => {
        describe("id validation", () => {
                it("wrong id format", async () => {
                        const TestMetaUsers = new MetaUsers();
                        const { error, data } = await TestMetaUsers.getMetaUser("some_id_that_looks_okay");

                        expect(error).not.toBeNull();
                        expect(error).toBe("Invalid id characters");
                        expect(data).toBeNull();
                });

                it("short id", async () => {
                        const TestMetaUsers = new MetaUsers();
                        const { error, data } = await TestMetaUsers.getMetaUser("192.14");

                        expect(error).not.toBeNull();
                        expect(error).toBe("Invalid id size");
                        expect(data).toBeNull();
                });

                it("long id", async () => {
                        const TestMetaUsers = new MetaUsers();
                        const { error, data } = await TestMetaUsers.getMetaUser(
                                "192.141.511.125.672.1246.1516.793192.1415"
                        );

                        expect(error).not.toBeNull();
                        expect(error).toBe("Invalid id size");
                        expect(data).toBeNull();
                });

                it("proper id", async () => {
                        const TestMetaUsers = new MetaUsers();
                        const { error } = await TestMetaUsers.getMetaUser("192.162.0.1");

                        expect(error).toBeNull();
                });
        });
});

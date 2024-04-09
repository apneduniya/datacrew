import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default function LeaderboardSection(props: {user: Array<object>}) {

    const users = [
        {
            rank: 1,
            username: "thatsmeadarsh",
            points: 25000,
        },
        {
            rank: 2,
            username: "codingwizard",
            points: 22000,
        },
        {
            rank: 3,
            username: "dev_guru",
            points: 21000,
        },
        {
            rank: 4,
            username: "code_ninja",
            points: 20500,
        },
        {
            rank: 5,
            username: "tech_geek",
            points: 20000,
        },
        {
            rank: 6,
            username: "js_master",
            points: 19000,
        },
        {
            rank: 7,
            username: "python_pro",
            points: 18500,
        },
        {
            rank: 8,
            username: "web_wizard",
            points: 18000,
        },
        {
            rank: 9,
            username: "programmer_girl",
            points: 17500,
        },
        {
            rank: 10,
            username: "java_guru",
            points: 17000,
        },
        {
            rank: 11,
            username: "code_artist",
            points: 16500,
        },
        {
            rank: 12,
            username: "csharp_ninja",
            points: 16000,
        },
        {
            rank: 13,
            username: "hackerman",
            points: 15500,
        },
        {
            rank: 14,
            username: "data_scientist",
            points: 15000,
        },
        {
            rank: 15,
            username: "fullstack_dev",
            points: 14500,
        },
        {
            rank: 16,
            username: "backend_hero",
            points: 14000,
        },
        {
            rank: 17,
            username: "frontend_guru",
            points: 13500,
        },
        {
            rank: 18,
            username: "coding_queen",
            points: 13000,
        },
        {
            rank: 19,
            username: "code_lover",
            points: 12500,
        },
        {
            rank: 20,
            username: "code_wonder",
            points: 12000,
        }
    ];


    return (
        <>
            <section className="w-full flex flex-col items-center justify-center gap-6 mt-5 mb-20">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {/* <TableHead className="w-[100px] text-xs">Rank</TableHead> */}
                            <TableHead className="text-xs">User</TableHead>
                            <TableHead className="text-right text-xs">Points</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {props.user.map((user) => (
                            <TableRow key={user.owner}>
                                {/* <TableCell className="font-medium text-xs">{user.rank}</TableCell> */}
                                <TableCell className="text-xs">{user.owner}</TableCell>
                                <TableCell className="text-right text-xs">{user.point}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </>
    )
}



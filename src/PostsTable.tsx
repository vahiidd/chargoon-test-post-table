import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

interface Column {
  id: 'id' | 'userId' | 'title' | 'body';
  label: string;
  minWidth?: number;
}

interface Post {
  id: string;
  userId: string;
  title: string;
  body: string;
}

const columns: Column[] = [
  {
    id: 'id',
    label: 'id',
    minWidth: 10,
  },
  {
    id: 'userId',
    label: 'userId',
    minWidth: 10,
  },
  {
    id: 'title',
    label: 'title',
    minWidth: 170,
  },
  {
    id: 'body',
    label: 'body',
    minWidth: 170,
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const PostsTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/');
    const data = await res.json();
    setPosts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {posts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post) => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={post.id}>
                    {columns.map((column) => {
                      const value = post[column.id];
                      return <TableCell key={column.id}>{value}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={posts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PostsTable;

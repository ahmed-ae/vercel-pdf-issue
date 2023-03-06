import type { NextApiRequest, NextApiResponse } from 'next'

export default handler;

export const config = {
  api: {
    responseLimit: '2mb',
  },
};

async function handler(  req: NextApiRequest,
    res: NextApiResponse) {
  const url = new URL("https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf");

  const data = req.query;

  try {
    const cert = await fetch(url, {
      method: 'GET'
    });
    const resultBody = await cert.body;

    res.setHeader('content-type', 'application/pdf');
    res.setHeader('content-disposition', 'inline; filename=dummy.pdf');
    res.send(resultBody);
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: 'Internal server error',
    });
  }
}
